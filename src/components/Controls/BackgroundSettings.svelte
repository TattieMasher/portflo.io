<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  let isTransparent = false;
  let backgroundColor = '#ffffff';
  let borderRadius = 0; // Now a number representing pixels
  let previousSelectedElement = null;

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    backgroundColor = $selectedElementStyles.backgroundColor || '#ffffff';
    isTransparent = !backgroundColor || backgroundColor === 'transparent';
    borderRadius = parseInt($selectedElementStyles.borderRadius) || 0;
  }

  // Reactive statement to update background color and border radius
  $: {
    const color = isTransparent ? 'transparent' : backgroundColor;
    updateElementStyle($selectedElement, 'backgroundColor', color);

    if (!isTransparent) {
      updateElementStyle($selectedElement, 'borderRadius', `${borderRadius}px`);
    } else {
      // Reset border radius when background is transparent
      updateElementStyle($selectedElement, 'borderRadius', '0px');
    }
  }
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="background-settings" />
  <label for="background-settings" class="collapse-title text-xl font-medium">
    Background Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Transparent</span>
          <input
            type="checkbox"
            class="checkbox checkbox-info"
            bind:checked={isTransparent}
          />
        </label>
      </div>
      {#if !isTransparent}
        <label for="background-color-control" class="label">
          <span class="label-text">Background Color</span>
        </label>
        <input
          id="background-color-control"
          type="color"
          class="input input-bordered"
          bind:value={backgroundColor}
        />

        <!-- Border Radius Slider -->
        <label for="border-radius-control" class="label mt-4">
          <span class="label-text">Border Radius: {borderRadius}px</span>
        </label>
        <input
          id="border-radius-control"
          type="range"
          min="0"
          max="50"
          bind:value={borderRadius}
          class="range range-secondary"
        />
      {/if}
    </div>
  </div>
</div>