<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import RangeSetting from './Modules/RangeSetting.svelte';

  let isTransparent = false;
  let backgroundColor = '#ffffff';
  let borderRadius = 0; // number representing pixels
  let previousSelectedElement = null;

  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    backgroundColor = $selectedElementStyles.backgroundColor || '#ffffff';
    isTransparent = !backgroundColor || backgroundColor === 'transparent';
    borderRadius = parseInt($selectedElementStyles.borderRadius) || 0;
  }
  
  $: {
    const color = isTransparent ? 'transparent' : backgroundColor;
    updateElementStyle($selectedElement, 'backgroundColor', color);

    if (!isTransparent) {
      updateElementStyle($selectedElement, 'borderRadius', `${borderRadius}px`);
    } else {
      // Reset border radius to 0px when background is transparent
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
        <RangeSetting
          label="Border Radius"
          min={0}
          max={50}
          value={borderRadius}
          unit="px"
          onChange={(val) => updateElementStyle($selectedElement, 'borderRadius', `${val}px`)}
        />
      {/if}
    </div>
  </div>
</div>