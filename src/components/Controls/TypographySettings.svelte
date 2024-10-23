<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';

  let fontFamily = 'Arial';
  let fontWeight = 'normal';
  let textDecoration = 'none';
  let previousSelectedElement = null;

  const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia'];
  const fontWeights = ['normal', 'bold', 'bolder', 'lighter'];
  const textDecorations = ['none', 'underline', 'overline', 'line-through'];

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = $elementStyles[$selectedElement] || {};
    fontFamily = styles.fontFamily || 'Arial';
    fontWeight = styles.fontWeight || 'normal';
    textDecoration = styles.textDecoration || 'none';
  }

  $: {
    updateElementStyle($selectedElement, 'fontFamily', fontFamily);
    updateElementStyle($selectedElement, 'fontWeight', fontWeight);
    updateElementStyle($selectedElement, 'textDecoration', textDecoration);
  }
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="typography-settings" />
  <label for="typography-settings" class="collapse-title text-xl font-medium">
    Typography Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <!-- Font Family Selector -->
      <label class="label">
        <span class="label-text">Font Family</span>
      </label>
      <select bind:value={fontFamily} class="select select-bordered">
        {#each fontFamilies as family}
          <option value={family}>{family}</option>
        {/each}
      </select>

      <!-- Font Weight Selector -->
      <label class="label mt-4">
        <span class="label-text">Font Weight</span>
      </label>
      <select bind:value={fontWeight} class="select select-bordered">
        {#each fontWeights as weight}
          <option value={weight}>{weight.charAt(0).toUpperCase() + weight.slice(1)}</option>
        {/each}
      </select>

      <!-- Text Decoration Selector -->
      <label class="label mt-4">
        <span class="label-text">Text Decoration</span>
      </label>
      <select bind:value={textDecoration} class="select select-bordered">
        {#each textDecorations as decoration}
          <option value={decoration}>{decoration.charAt(0).toUpperCase() + decoration.slice(1)}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
