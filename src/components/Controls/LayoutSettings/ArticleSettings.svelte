<script>
  import { rootStore } from '../../../stores/rootStore';
  import { updateContainerProperty } from '../../../utils/updateContainerProperty.js';
  import { get } from 'svelte/store';

  const { selectedElement, projects } = rootStore;

  let centeredComponents = false;
  let previousSelectedElement = null;

  // Initialize local variables when the selected element changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const [projectIndex, containerIndex] = getIndicesFromElementId($selectedElement);
    if (projectIndex !== null && containerIndex !== null) {
      const container = $projects[projectIndex]?.containers[containerIndex];
      centeredComponents = container?.centeredComponents || false;
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

  // Reactive update
  $: updateLayoutSetting('centeredComponents', centeredComponents);
</script>

<div class="form-control">
  <label class="cursor-pointer label">
    <span class="label-text">Center Components</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={centeredComponents}
    />
  </label>
</div>
