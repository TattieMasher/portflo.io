<script>
  import RangeSetting from './Modules/RangeSetting.svelte';
  import { rootStore } from '../../stores/rootStore';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  const { selectedElement, elementStyles } = rootStore;

  let imageWidth = 100; // Percentage value
  let imageHeight = 'auto';
  let borderRadius = 0; // Percentage value
  let previousSelectedElement = null;

  // Initialize local variables when the selected element changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = $elementStyles[$selectedElement]?.image || {};
    imageWidth = styles.width?.endsWith('%') ? parseInt(styles.width) : 100;
    imageHeight = styles.height || 'auto';
    borderRadius = parseInt(styles.borderRadius) || 0;
  }

  // Reactive updates to element styles
  $: updateElementStyle($selectedElement, 'width', `${imageWidth}%`, 'image');
  $: updateElementStyle(
    $selectedElement,
    'height',
    imageHeight === 'auto' ? 'auto' : `${imageHeight}px`,
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
    <!-- Width Setting -->
    <RangeSetting
      label="Width"
      min={0}
      max={100}
      value={imageWidth}
      unit="%"
      onChange={(val) => (imageWidth = val)}
    />

    <!-- Height Setting -->
    <RangeSetting
      label="Height"
      min={50}
      max={500}
      value={parseInt(imageHeight) || 50}
      unit="px"
      onChange={(val) => (imageHeight = `${val}px`)}
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
