<script>
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

  const toggleFlowDirection = (checked) => {
    flowDirection = checked ? 'vertical' : 'horizontal';
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="carousel-settings" />
  <label for="carousel-settings" class="collapse-title text-xl font-medium">
    Carousel Settings
  </label>
  <div class="collapse-content">
    <!-- Flow Direction -->
    <label class="swap" id="carousel-direction">
      <input
        type="checkbox"
        checked={flowDirection === 'vertical'}
        on:change={(e) => toggleFlowDirection(e.target.checked)}
      />
      <div class="swap-on">Vertical Flow</div>
      <div class="swap-off">Horizontal Flow</div>
    </label>

    <!-- Width Setting -->
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Width: {width}%</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        bind:value={width}
        class="range range-primary"
      />
    </div>

    <!-- Height Setting -->
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Height (px or 'auto')</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={height}
        placeholder="e.g., auto, 200"
      />
    </div>

    <!-- Border Radius Setting -->
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Border Radius: {borderRadius}%</span>
      </label>
      <input
        type="range"
        min="0"
        max="50"
        bind:value={borderRadius}
        class="range range-primary"
      />
    </div>
  </div>
</div>

<style>
  #carousel-direction {
    text-align: center;
  }
</style>
