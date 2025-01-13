<script>
  import RangeSetting from './Modules/RangeSetting.svelte';
  import ColorPicker from './Modules/ColorPicker.svelte';
  import DropdownSelect from './Modules/DropdownSelect.svelte';
  import { rootStore } from '../../stores/rootStore.js';
  import { get } from 'svelte/store';

  const { selectedElement, elementStyles } = rootStore;

  let borderWidth = 0;
  let borderStyle = 'solid';
  let borderColor = '#000000';
  let previousSelectedElement = null;

  const borderStyles = [
    { label: 'None', value: 'none' },
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'Double', value: 'double' },
    { label: 'Groove', value: 'groove' },
    { label: 'Ridge', value: 'ridge' },
  ];

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
    <DropdownSelect
      label="Border Style"
      options={borderStyles}
      value={borderStyle}
      onChange={(val) => (borderStyle = val)}
    />

    <!-- Border Color Picker -->
    <ColorPicker
      label="Border Color"
      value={borderColor}
      onChange={(val) => (borderColor = val)}
    />
  </div>
</div>
