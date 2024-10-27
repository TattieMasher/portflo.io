<script>
  import { selectedElement } from '../../../stores/selectedElement.js';
  import { projects } from '../../../stores/projects.js';
  import { updateContainerProperty } from '../../../utils/updateContainerProperty.js';

  let numColumns = 2;
  let gapSize = '1rem';
  let previousSelectedElement = null;

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const [projectIndex, containerIndex] = getIndicesFromElementId($selectedElement);
    if (projectIndex !== null && containerIndex !== null) {
      const container = $projects[projectIndex]?.containers[containerIndex];
      numColumns = container?.numColumns || 2;
      gapSize = container?.gapSize || '1rem';
    }
  }

  function updateLayoutSetting(property, value) {
    const [projectIndex, containerIndex] = getIndicesFromElementId($selectedElement);
    if (projectIndex !== null && containerIndex !== null) {
      updateContainerProperty(projectIndex, containerIndex, property, value);
    }
  }

  function getIndicesFromElementId(elementId) {
    if (elementId && elementId.startsWith('project-')) {
      const parts = elementId.split('-');
      const projectIndex = parseInt(parts[1]);
      if (parts[2] === 'container') {
        const containerIndex = parseInt(parts[3]);
        return [projectIndex, containerIndex];
      }
    }
    return [null, null];
  }

  // Reactive statements to update numColumns and gapSize
  $: updateLayoutSetting('numColumns', numColumns);
  $: updateLayoutSetting('gapSize', gapSize);
</script>

<div class="form-control">
  <!-- Number of Columns -->
  <label class="label">
    <span class="label-text">Number of Columns</span>
  </label>
  <input
    type="number"
    min="1"
    max="6"
    bind:value={numColumns}
    class="input input-bordered"
  />

  <!-- Gap Size -->
  <label class="label mt-4">
    <span class="label-text">Gap Size (e.g., 1rem, 10px)</span>
  </label>
  <input
    type="text"
    placeholder="e.g., 1rem, 10px"
    bind:value={gapSize}
    class="input input-bordered"
  />
</div>