<script>
  import { rootStore } from '../../../stores/rootStore';
  import { updateContainerProperty } from '../../../utils/updateContainerProperty.js';

  const { selectedElement, projects } = rootStore;

  let transitionSpeed = 500; // in milliseconds
  let autoplay = false;
  let looping = true;
  let navigationControls = true;
  let paginationIndicators = true;
  let slideDirection = 'horizontal';
  let visibleSlides = 1;
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
      transitionSpeed = container?.transitionSpeed || 500;
      autoplay = container?.autoplay || false;
      looping = container?.looping !== undefined ? container.looping : true;
      navigationControls = container?.navigationControls !== undefined ? container.navigationControls : true;
      paginationIndicators = container?.paginationIndicators !== undefined ? container.paginationIndicators : true;
      slideDirection = container?.slideDirection || 'horizontal';
      visibleSlides = container?.visibleSlides || 1;
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

  // Reactive updates
  $: updateLayoutSetting('transitionSpeed', transitionSpeed);
  $: updateLayoutSetting('autoplay', autoplay);
  $: updateLayoutSetting('looping', looping);
  $: updateLayoutSetting('navigationControls', navigationControls);
  $: updateLayoutSetting('paginationIndicators', paginationIndicators);
  $: updateLayoutSetting('slideDirection', slideDirection);
  $: updateLayoutSetting('visibleSlides', visibleSlides);
</script>

<div class="form-control">
  CURRENTLY DON'T DO ANYTHING!
  <!-- Transition Speed -->
  <label class="label">
    <span class="label-text">Transition Speed (ms)</span>
  </label>
  <input
    type="number"
    min="100"
    max="2000"
    step="100"
    bind:value={transitionSpeed}
    class="input input-bordered"
  />

  <!-- Autoplay Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Autoplay</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={autoplay}
    />
  </label>

  <!-- Looping Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Looping</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={looping}
    />
  </label>

  <!-- Navigation Controls Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Show Navigation Controls</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={navigationControls}
    />
  </label>

  <!-- Pagination Indicators Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Show Pagination Indicators</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={paginationIndicators}
    />
  </label>

  <!-- Slide Direction Selector -->
  <label class="label mt-4">
    <span class="label-text">Slide Direction</span>
  </label>
  <select bind:value={slideDirection} class="select select-bordered">
    <option value="horizontal">Horizontal</option>
    <option value="vertical">Vertical</option>
  </select>

  <!-- Visible Slides Count -->
  <label class="label mt-4">
    <span class="label-text">Visible Slides</span>
  </label>
  <input
    type="number"
    min="1"
    max="5"
    bind:value={visibleSlides}
    class="input input-bordered"
  />
</div>
