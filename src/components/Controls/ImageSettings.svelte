<!-- components/Controls/ImageSettings.svelte -->
<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  let imageWidth = 100; // Percentage value
  let imageHeight = 'auto';
  let borderRadius = 0; // Percentage value
  let previousSelectedElement = null;

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    // Initialize imageWidth
    if ($selectedElementStyles.width && $selectedElementStyles.width.endsWith('%')) {
      imageWidth = parseInt($selectedElementStyles.width);
    } else {
      imageWidth = 100;
    }

    imageHeight = $selectedElementStyles.height || 'auto';
    borderRadius = parseInt($selectedElementStyles.borderRadius) || 0;
  }

  // Reactive statement to update image styles
  $: {
    updateElementStyle($selectedElement, 'width', `${imageWidth}%`);
    updateElementStyle(
      $selectedElement,
      'height',
      imageHeight === 'auto' ? 'auto' : `${imageHeight}px`
    );
    updateElementStyle($selectedElement, 'borderRadius', `${borderRadius}%`);
  }

  const updateHeight = () => {
    if (imageHeight === 'auto') {
      updateElementStyle($selectedElement, 'height', 'auto');
    } else {
      updateElementStyle($selectedElement, 'height', `${imageHeight}px`);
    }
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="image-settings" />
  <label for="image-settings" class="collapse-title text-xl font-medium">
    Image Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Width: {imageWidth}%</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        bind:value={imageWidth}
        class="range range-primary"
      />
    </div>
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Height (px)</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={imageHeight}
        on:input={updateHeight}
        placeholder="e.g., auto, 200"
      />
    </div>
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