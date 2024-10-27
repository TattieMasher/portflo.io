<!-- components/Controls/LayoutSettings.svelte -->
<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { projects } from '../../stores/projects.js';
  import { updateContainerProperty } from '../../utils/updateContainerProperty.js';

  let numColumns = 2;
  let gapSize = '1rem';
  let centeredComponents = false;
  let previousSelectedElement = null;
  let containerLayout = null;

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const [projectIndex, containerIndex] = getIndicesFromElementId($selectedElement);
    if (projectIndex !== null && containerIndex !== null) {
      const container = $projects[projectIndex]?.containers[containerIndex];
      containerLayout = container?.layout || null;

      if (containerLayout === 'grid') {
        numColumns = container?.numColumns || 2;
        gapSize = container?.gapSize || '1rem';
      } else if (containerLayout === 'article') {
        centeredComponents = container?.centeredComponents || false;
      }
      // Add other layouts and their settings here
    }
  }

  function updateContainerSetting(property, value) {
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

  // Reactive statements to update container settings
  $: if (containerLayout === 'grid') {
    updateContainerSetting('numColumns', numColumns);
    updateContainerSetting('gapSize', gapSize);
  } else if (containerLayout === 'article') {
    updateContainerSetting('centeredComponents', centeredComponents);
  }
  // Add reactive statements for other layouts here
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="layout-settings" />
  <label for="layout-settings" class="collapse-title text-xl font-medium">
    Layout Settings
  </label>
  <div class="collapse-content">
    {#if containerLayout === 'grid'}
      <!-- Settings for Grid Layout -->
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
    {:else if containerLayout === 'article'}
      <!-- Settings for Article Layout -->
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
    {/if}
    <!-- TODO: Settings for other layouts -->
  </div>
</div>