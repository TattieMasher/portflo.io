<script>
  import { rootStore } from '../../../stores/rootStore';
  import { updateContainerProperty } from '../../../utils/updateContainerProperty.js';

  const { selectedElement, projects } = rootStore;

  let orientation = 'vertical';
  let alternatingSides = true;
  let connectorStyle = 'solid';
  let iconSize = 30;
  let iconColor = '#2196f3';
  let eventSpacing = '1rem';
  let highlightCurrent = true;
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
      orientation = container?.orientation || 'vertical';
      alternatingSides = container?.alternatingSides !== undefined ? container.alternatingSides : true;
      connectorStyle = container?.connectorStyle || 'solid';
      iconSize = container?.iconSize || 30;
      iconColor = container?.iconColor || '#2196f3';
      eventSpacing = container?.eventSpacing || '1rem';
      highlightCurrent = container?.highlightCurrent !== undefined ? container.highlightCurrent : true;
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

  // Reactive updates for container properties
  $: updateLayoutSetting('orientation', orientation);
  $: updateLayoutSetting('alternatingSides', alternatingSides);
  $: updateLayoutSetting('connectorStyle', connectorStyle);
  $: updateLayoutSetting('iconSize', iconSize);
  $: updateLayoutSetting('iconColor', iconColor);
  $: updateLayoutSetting('eventSpacing', eventSpacing);
  $: updateLayoutSetting('highlightCurrent', highlightCurrent);
</script>

<div class="form-control">
  <!-- Orientation Selector -->
  <label class="label">
    <span class="label-text">Orientation</span>
  </label>
  <select bind:value={orientation} class="select select-bordered">
    <option value="vertical">Vertical</option>
    <option value="horizontal">Horizontal</option>
  </select>

  <!-- Alternating Sides Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Alternating Sides</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={alternatingSides}
    />
  </label>

  <!-- Connector Style Selector -->
  <label class="label mt-4">
    <span class="label-text">Connector Style</span>
  </label>
  <select bind:value={connectorStyle} class="select select-bordered">
    <option value="solid">Solid</option>
    <option value="dashed">Dashed</option>
    <option value="dotted">Dotted</option>
    <option value="double">Double</option>
    <option value="groove">Groove</option>
    <option value="ridge">Ridge</option>
  </select>

  <!-- Icon Size -->
  <label class="label mt-4">
    <span class="label-text">Icon Size (px)</span>
  </label>
  <input
    type="number"
    min="10"
    max="100"
    bind:value={iconSize}
    class="input input-bordered"
  />

  <!-- Icon Color -->
  <label class="label mt-4">
    <span class="label-text">Icon Color</span>
  </label>
  <input
    type="color"
    bind:value={iconColor}
    class="input input-bordered w-full max-w-xs"
  />

  <!-- Event Spacing -->
  <label class="label mt-4">
    <span class="label-text">Event Spacing (e.g., 1rem)</span>
  </label>
  <input
    type="text"
    placeholder="e.g., 1rem, 10px"
    bind:value={eventSpacing}
    class="input input-bordered"
  />

  <!-- Highlight Current Event Toggle -->
  <label class="cursor-pointer label mt-4">
    <span class="label-text">Highlight Current Event</span>
    <input
      type="checkbox"
      class="checkbox checkbox-info"
      bind:checked={highlightCurrent}
    />
  </label>
</div>
