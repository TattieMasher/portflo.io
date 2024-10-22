<!-- components/Controls/TextSettings.svelte -->
<script>
  import Icon from '@iconify/svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  const fontSizes = {
    Small: '12px',
    Medium: '16px',
    Large: '20px',
    XL: '24px',
  };

  const alignments = ['left', 'center', 'right', 'justify'];

  let selectedFontSize = 'Medium';
  let selectedAlignment = 'left';
  let textColor = '#000000';
  let previousSelectedElement = null;

  // Initialize local variables when selectedElement changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    selectedFontSize =
      Object.keys(fontSizes).find(
        (key) => fontSizes[key] === ($selectedElementStyles.fontSize || '16px')
      ) || 'Medium';

    selectedAlignment = $selectedElementStyles.textAlign || 'left';
    textColor = $selectedElementStyles.color || '#000000';
  }

  const updateFontSize = () => {
    updateElementStyle($selectedElement, 'fontSize', fontSizes[selectedFontSize]);
  };

  const updateAlignment = (alignment) => {
    selectedAlignment = alignment;
    updateElementStyle($selectedElement, 'textAlign', alignment);
  };

  const updateTextColor = () => {
    updateElementStyle($selectedElement, 'color', textColor);
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="text-settings" />
  <label for="text-settings" class="collapse-title text-xl font-medium">
    Text Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <label for="font-size-control" class="label">
        <span class="label-text">Font Size</span>
      </label>
      <div id="font-size-control" class="flex flex-col space-y-2">
        {#each Object.keys(fontSizes) as size}
          <label class="flex items-center">
            <input
              type="radio"
              name="font-size"
              value={size}
              bind:group={selectedFontSize}
              on:change={updateFontSize}
            />
            <span class="ml-2">{size}</span>
          </label>
        {/each}
      </div>
    </div>
    <div class="divider"></div>
    <div class="form-control">
      <label for="alignment-control" class="label">
        <span class="label-text">Alignment</span>
      </label>
      <div id="alignment-control" class="flex space-x-2">
        {#each alignments as alignment}
          <button
            class="btn btn-outline btn-sm"
            class:btn-active={selectedAlignment === alignment}
            on:click={() => updateAlignment(alignment)}
            title={alignment.charAt(0).toUpperCase() + alignment.slice(1)}
          >
            <Icon icon={`radix-icons:text-align-${alignment}`} class="text-xl" />
          </button>
        {/each}
      </div>
    </div>
    <div class="divider"></div>
    <div class="form-control">
      <label for="text-color-control" class="label">
        <span class="label-text">Color</span>
      </label>
      <input
        id="text-color-control"
        type="color"
        class="input input-bordered"
        bind:value={textColor}
        on:input={updateTextColor}
      />
    </div>
  </div>
</div>