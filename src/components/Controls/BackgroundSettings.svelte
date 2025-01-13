<script>
  import { rootStore } from '../../stores/rootStore.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import RangeSetting from './Modules/RangeSetting.svelte';
  import { get } from 'svelte/store';

  // Destructure required stores from rootStore
  const { selectedElement, selectedElementStyles } = rootStore;

  let isTransparent = false;
  let backgroundColor = '#ffffff';
  let borderRadius = 0; // number representing pixels
  let previousSelectedElement = null;

  $: {
    const currentSelectedElement = get(selectedElement);
    const currentSelectedElementStyles = get(selectedElementStyles);

    if (currentSelectedElement !== previousSelectedElement) {
      previousSelectedElement = currentSelectedElement;
      initializeLocalVariables(currentSelectedElementStyles);
    }

    const color = isTransparent ? 'transparent' : backgroundColor;
    updateElementStyle(currentSelectedElement, 'backgroundColor', color);

    if (!isTransparent) {
      updateElementStyle(currentSelectedElement, 'borderRadius', `${borderRadius}px`);
    } else {
      updateElementStyle(currentSelectedElement, 'borderRadius', '0px');
    }
  }

  function initializeLocalVariables(styles) {
    backgroundColor = styles?.backgroundColor || '#ffffff';
    isTransparent = !backgroundColor || backgroundColor === 'transparent';
    borderRadius = parseInt(styles?.borderRadius) || 0;
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
          onChange={(val) => updateElementStyle(get(selectedElement), 'borderRadius', `${val}px`)}
        />
      {/if}
    </div>
  </div>
</div>
