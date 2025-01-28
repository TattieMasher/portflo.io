<script>
  import RangeSetting from './Modules/RangeSetting.svelte';
  import { rootStore } from '../../stores/rootStore';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  const { selectedElement, elementStyles } = rootStore;

  let imageWidth = 100; // Default to 100% for new images
  let widthUnit = '%'; // Default unit for width
  let borderRadius = 0; // Percentage value for border radius
  let previousSelectedElement = null;

  // Initialize local variables when the selected element changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = $elementStyles[$selectedElement]?.image || {};
    if (styles.width) {
      imageWidth = parseInt(styles.width) || 100;
      widthUnit = styles.width.endsWith('%') ? '%' : 'px';
    } else {
      // Default to 100% if no width is defined
      imageWidth = 100;
      widthUnit = '%';
    }
    borderRadius = parseInt(styles.borderRadius) || 0;
  }

  function handleWidthUnitChange(newUnit) {
    // Set sensible defaults when switching units
    if (newUnit === '%' && widthUnit === 'px') {
      imageWidth = 100; // Default to 100% when switching from px
    } else if (newUnit === 'px' && widthUnit === '%') {
      imageWidth = 500; // Default to 500px when switching from %
    }
    widthUnit = newUnit;
  }

  // Update the width style dynamically based on the unit
  $: updateElementStyle(
    $selectedElement,
    'width',
    `${imageWidth}${widthUnit}`,
    'image'
  );

  $: updateElementStyle($selectedElement, 'borderRadius', `${borderRadius}%`, 'image');
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="image-settings" />
  <label for="image-settings" class="collapse-title text-xl font-medium">
    Image Settings
  </label>
  <div class="collapse-content">
    <!-- Toggle for Width Unit -->
    <div class="form-control mb-4">
      <label class="label cursor-pointer">
        <span class="label-text">Width Unit</span>
        <input
          type="checkbox"
          class="toggle toggle-primary"
          checked={widthUnit === '%'}
          on:change={(e) => handleWidthUnitChange(e.target.checked ? '%' : 'px')}
        />
        <span class="label-text-alt ml-2">{widthUnit === '%' ? 'Percentage' : 'Pixels'}</span>
      </label>
    </div>

    <!-- Width Setting -->
    <RangeSetting
      label="Width"
      min={widthUnit === '%' ? 0 : 50}
      max={widthUnit === '%' ? 100 : 1920}
      value={imageWidth}
      unit={widthUnit}
      onChange={(val) => (imageWidth = val)}
    />

    <!-- Border Radius Setting -->
    <RangeSetting
      label="Border Radius"
      min={0}
      max={50}
      value={borderRadius}
      unit="%"
      onChange={(val) => (borderRadius = val)}
    />
  </div>
</div>
