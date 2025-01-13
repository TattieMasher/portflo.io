<script>
  import ToggleSwitch from './Modules/ToggleSwitch.svelte';
  import RangeSetting from './Modules/RangeSetting.svelte';
  import { rootStore } from '../../stores/rootStore';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import { get } from 'svelte/store';

  const { selectedElement, elementStyles } = rootStore;

  let flowDirection = 'horizontal'; // 'horizontal' or 'vertical'
  let width = 100; // Percentage value
  let height = 'auto';
  let borderRadius = 0; // Percentage value
  let previousSelectedElement = null;

  // Initialize local variables when the selected element changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = $elementStyles[$selectedElement]?.carousel || {};
    flowDirection = styles.flowDirection || 'horizontal';
    width = parseInt(styles.width) || 100;
    height = styles.height || 'auto';
    borderRadius = parseInt(styles.borderRadius) || 0;
  }

  // Reactive updates
  $: updateElementStyle($selectedElement, 'flowDirection', flowDirection, 'carousel');
  $: updateElementStyle($selectedElement, 'width', `${width}%`, 'carousel');
  $: updateElementStyle(
    $selectedElement,
    'height',
    height === 'auto' ? 'auto' : `${height}px`,
    'carousel'
  );
  $: updateElementStyle($selectedElement, 'borderRadius', `${borderRadius}%`, 'carousel');
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="carousel-settings" />
  <label for="carousel-settings" class="collapse-title text-xl font-medium">
    Carousel Settings
  </label>
  <div class="collapse-content">
    <!-- Flow Direction Toggle -->
    <ToggleSwitch
      label="Flow Direction"
      checked={flowDirection === 'vertical'}
      onChange={(checked) => (flowDirection = checked ? 'vertical' : 'horizontal')}
    />

    <!-- Width Setting -->
    <RangeSetting
      label="Width"
      min={0}
      max={100}
      value={width}
      unit="%"
      onChange={(val) => (width = val)}
    />

    <!-- Height Setting -->
    <RangeSetting
      label="Height"
      min={50}
      max={500}
      value={parseInt(height) || 50}
      unit="px"
      onChange={(val) => (height = `${val}px`)}
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


<style>
  #carousel-direction {
    text-align: center;
  }
</style>
