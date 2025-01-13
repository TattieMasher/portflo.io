<script>
  import { rootStore } from '../../../stores/rootStore';
  import { updateContainerProperty } from '../../../utils/updateContainerProperty.js';

  const { selectedElement, projects } = rootStore;

  let columnCount = 3;
  let columnGap = '1rem';
  let itemGap = '1rem';
  let responsiveAdjustments = true;
  let alignment = 'left';
  let dynamicItemSizing = true;
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
      columnCount = container?.columnCount || 3;
      columnGap = container?.columnGap || '1rem';
      itemGap = container?.itemGap || '1rem';
      responsiveAdjustments = container?.responsiveAdjustments !== undefined ? container.responsiveAdjustments : true;
      alignment = container?.alignment || 'left';
      dynamicItemSizing = container?.dynamicItemSizing !== undefined ? container.dynamicItemSizing : true;
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
  $: updateLayoutSetting('columnCount', columnCount);
  $: updateLayoutSetting('columnGap', columnGap);
  $: updateLayoutSetting('itemGap', itemGap);
  $: updateLayoutSetting('responsiveAdjustments', responsiveAdjustments);
  $: updateLayoutSetting('alignment', alignment);
  $: updateLayoutSetting('dynamicItemSizing', dynamicItemSizing);
</script>

<div class="form-control">
  <!-- Column Count -->
  <label class="label">
    <span class="label-text">Number of Columns</span>
  </label>
  <input
    type="number"
    min="1"
    max="6"
    bind:value={columnCount}
    class="input input-bordered"
  />

  <!-- Column Gap -->
  <label class="label mt-4">
    <span class="label-text">Column Gap (e.g., 1rem, 10px)</span>
  </label>
  <input
    type="text"
    placeholder="e.g., 1rem, 10px"
    bind:value={columnGap}
    class="input input-bordered"
  />

  <!-- Item Gap -->
  <label class="label mt-4">
    <span class="label-text">Item Gap (e.g., 1rem, 10px)</span>
  </label>
  <input
    type="text"
    placeholder="e.g., 1rem, 10px"
    bind:value={itemGap}
    class="input input-bordered"
  />

  <!-- Responsive Adjustments Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Enable Responsive Adjustments</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={responsiveAdjustments}
    />
  </label>

  <!-- Alignment Selector -->
  <label class="label mt-4">
    <span class="label-text">Alignment</span>
  </label>
  <select bind:value={alignment} class="select select-bordered">
    <option value="left">Left</option>
    <option value="center">Center</option>
    <option value="right">Right</option>
  </select>

  <!-- Dynamic Item Sizing Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Enable Dynamic Item Sizing</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={dynamicItemSizing}
    />
  </label>
</div>
