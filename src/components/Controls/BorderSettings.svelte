<script>
  import { rootStore } from '../../stores/rootStore.js';
  import { get } from 'svelte/store';
  import RangeSetting from './Modules/RangeSetting.svelte';

  const { selectedElement, elementStyles } = rootStore;

  let borderWidth = 0;
  let borderStyle = 'solid';
  let borderColor = '#000000';
  let previousSelectedElement = null;

  const borderStyles = ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'];

  // Reactive variable to update when selectedElement changes
  $: if (get(selectedElement) !== previousSelectedElement) {
    previousSelectedElement = get(selectedElement);
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = get(elementStyles)[get(selectedElement)] || {};
    borderWidth = parseInt(styles.borderWidth) || 0;
    borderStyle = styles.borderStyle || 'solid';
    borderColor = styles.borderColor || '#000000';
  }

  // Reactive updates to store
  $: {
    const currentElement = get(selectedElement);
    if (currentElement) {
      rootStore.elementStyles.update((styles) => {
        styles[currentElement] = {
          ...styles[currentElement],
          borderWidth: `${borderWidth}px`,
          borderStyle: borderStyle,
          borderColor: borderColor,
        };
        return styles;
      });
    }
  }
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="border-settings" />
  <label for="border-settings" class="collapse-title text-xl font-medium">
    Border Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <!-- Border Width Slider -->
      <RangeSetting
        label="Border Width"
        min={0}
        max={20}
        value={borderWidth}
        unit="px"
        onChange={(val) => (borderWidth = val)}
      />

      <!-- Border Style Selector -->
      <label class="label mt-4">
        <span class="label-text">Border Style</span>
      </label>
      <select bind:value={borderStyle} class="select select-bordered">
        {#each borderStyles as style}
          <option value={style}>{style.charAt(0).toUpperCase() + style.slice(1)}</option>
        {/each}
      </select>

      <!-- Border Color Picker -->
      <label class="label mt-4">
        <span class="label-text">Border Color</span>
      </label>
      <input
        type="color"
        bind:value={borderColor}
        class="input input-bordered w-full"
      />
    </div>
  </div>
</div>
