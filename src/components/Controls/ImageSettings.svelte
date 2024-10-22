<!-- components/Controls/ImageSettings.svelte -->
<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  let imageWidth = 'auto';
  let imageHeight = 'auto';
  let borderRadius = '0px';
  let previousSelectedElement = null;

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    imageWidth = $selectedElementStyles.width || 'auto';
    imageHeight = $selectedElementStyles.height || 'auto';
    borderRadius = $selectedElementStyles.borderRadius || '0px';
  }

  const updateWidth = () => {
    updateElementStyle($selectedElement, 'width', imageWidth);
  };

  const updateHeight = () => {
    updateElementStyle($selectedElement, 'height', imageHeight);
  };

  const updateBorderRadius = () => {
    updateElementStyle($selectedElement, 'borderRadius', borderRadius);
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
        <span class="label-text">Width</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={imageWidth}
        on:input={updateWidth}
        placeholder="e.g., 100%, 300px"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Height</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={imageHeight}
        on:input={updateHeight}
        placeholder="e.g., auto, 200px"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Border Radius</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={borderRadius}
        on:input={updateBorderRadius}
        placeholder="e.g., 0px, 50%"
      />
    </div>
  </div>
</div>