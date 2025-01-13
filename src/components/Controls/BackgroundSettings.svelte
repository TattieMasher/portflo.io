<script>
  import RangeSetting from './Modules/RangeSetting.svelte';
  import ColorPicker from './Modules/ColorPicker.svelte';
  import ToggleSwitch from './Modules/ToggleSwitch.svelte';
  import { rootStore } from '../../stores/rootStore.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import { get } from 'svelte/store';

  const { selectedElement, selectedElementStyles } = rootStore;

  let isTransparent = false;
  let backgroundColor = '#ffffff';
  let borderRadius = 0;

  $: {
    const element = get(selectedElement);
    const styles = get(selectedElementStyles);

    if (element) {
      backgroundColor = styles.backgroundColor || '#ffffff';
      isTransparent = !backgroundColor || backgroundColor === 'transparent';
      borderRadius = parseInt(styles.borderRadius) || 0;
    }
  }
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="background-settings" />
  <label for="background-settings" class="collapse-title text-xl font-medium">
    Background Settings
  </label>
  <div class="collapse-content">
    <ToggleSwitch
      label="Transparent"
      checked={isTransparent}
      onChange={(val) => {
        isTransparent = val;
        const color = isTransparent ? 'transparent' : backgroundColor;
        updateElementStyle(get(selectedElement), 'backgroundColor', color);
      }}
    />
    {#if !isTransparent}
      <ColorPicker
        label="Background Color"
        value={backgroundColor}
        onChange={(val) => {
          backgroundColor = val;
          updateElementStyle(get(selectedElement), 'backgroundColor', backgroundColor);
        }}
      />
      <RangeSetting
        label="Border Radius"
        min={0}
        max={50}
        value={borderRadius}
        unit="px"
        onChange={(val) => {
          borderRadius = val;
          updateElementStyle(get(selectedElement), 'borderRadius', `${borderRadius}px`);
        }}
      />
    {/if}
  </div>
</div>
