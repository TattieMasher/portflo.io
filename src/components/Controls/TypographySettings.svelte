<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { googleFonts } from '../../utils/googleFonts.js';

  let fontFamily = 'Arial';
  let fontWeight = '400';
  let textDecoration = 'none';
  let previousSelectedElement = null;

  let availableFontWeights = ['400']; // Default font weights

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = $elementStyles[$selectedElement] || {};
    fontFamily = styles.fontFamily || 'Arial';
    fontWeight = styles.fontWeight || '400';
    textDecoration = styles.textDecoration || 'none';
  }

  // Update available font weights when fontFamily changes
  $: {
    const selectedFont = googleFonts.find((font) => font.name === fontFamily);
    availableFontWeights = selectedFont ? selectedFont.weights : ['400'];
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
        {#each googleFonts as font}
          <option value={font.name} style="font-family: '{font.name}', sans-serif;">
            {font.name}
          </option>
        {/each}
      </select>

      <!-- Font Weight Selector -->
      <label class="label mt-4">
        <span class="label-text">Font Weight</span>
      </label>
      <select bind:value={fontWeight} class="select select-bordered">
        {#each availableFontWeights as weight}
          <option value={weight}>{weight}</option>
        {/each}
      </select>

      <!-- Text Decoration Selector -->
      <label class="label mt-4">
        <span class="label-text">Text Decoration</span>
      </label>
      <select bind:value={textDecoration} class="select select-bordered">
        <option value="none">None</option>
        <option value="underline">Underline</option>
        <option value="overline">Overline</option>
        <option value="line-through">Line-through</option>
      </select>
    </div>
  </div>
</div>