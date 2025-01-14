<script>
  import DropdownSelect from './Modules/DropdownSelect.svelte';
  import FontDropdown from './Modules/FontDropdown.svelte';
  import { rootStore } from '../../stores/rootStore';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import { googleFonts } from '../../utils/googleFonts.js';
  import { get } from 'svelte/store';

  const { selectedElement, elementStyles } = rootStore;

  let fontFamily = 'Arial';
  let fontWeight = '400';
  let textDecoration = 'none';
  let previousSelectedElement = null;

  let availableFontWeights = ['400']; // Default font weights

  // Sort the fonts alphabetically by name
  const sortedFonts = [...googleFonts].sort((a, b) => a.name.localeCompare(b.name));

  // Initialize local variables when `selectedElement` changes
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

  // Update available font weights when `fontFamily` changes
  $: {
    const selectedFont = sortedFonts.find((font) => font.name === fontFamily);
    availableFontWeights = selectedFont ? selectedFont.weights : ['400'];
  }

  // Update styles reactively
  $: updateElementStyle($selectedElement, 'fontFamily', fontFamily);
  $: updateElementStyle($selectedElement, 'fontWeight', fontWeight);
  $: updateElementStyle($selectedElement, 'textDecoration', textDecoration);
</script>

<div class="collapse collapse-arrow bg-base-200 overflow-visible">
  <input type="checkbox" id="typography-settings" />
  <label for="typography-settings" class="collapse-title text-xl font-medium">
    Typography Settings
  </label>
  <div class="collapse-content">
    <!-- Font Family Selector -->
    <FontDropdown
      selectedFont={fontFamily}
      onChange={(val) => (fontFamily = val)}
    />

    <!-- Font Weight Selector -->
    <DropdownSelect
      label="Font Weight"
      options={availableFontWeights.map((weight) => ({ label: weight, value: weight }))}
      value={fontWeight}
      onChange={(val) => (fontWeight = val)}
    />

    <!-- Text Decoration Selector -->
    <DropdownSelect
      label="Text Decoration"
      options={[
        { label: 'None', value: 'none' },
        { label: 'Underline', value: 'underline' },
        { label: 'Overline', value: 'overline' },
        { label: 'Line-through', value: 'line-through' },
      ]}
      value={textDecoration}
      onChange={(val) => (textDecoration = val)}
    />
  </div>
</div>
