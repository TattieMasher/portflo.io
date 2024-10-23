<script>
  import Icon from '@iconify/svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { updateElementStyle } from '../../utils/updateStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';

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
  let selectedComponentType = null;
  let subElement = 'both'; // New variable to select sub-element
  let previousSubElement = null;

  // Determine selectedComponentType
  $: {
    if ($selectedElement && $selectedElement.startsWith('project-')) {
      selectedComponentType = 'project';
    } else if ($selectedElement === 'user') {
      selectedComponentType = 'user';
    } else {
      selectedComponentType = 'other';
    }
  }

  // Initialize local variables when selectedElement or subElement changes
  $: if ($selectedElement !== previousSelectedElement || subElement !== previousSubElement) {
    previousSelectedElement = $selectedElement;
    previousSubElement = subElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    let elementStyle = $selectedElementStyles;
    if (selectedComponentType === 'project') {
      // Use the styles for the selected subElement
      if (subElement === 'title' || subElement === 'description') {
        elementStyle = $elementStyles[$selectedElement]?.[subElement] || {};
      } else {
        elementStyle = {}; // If 'both' is selected, we can't determine a single style
      }
    }

    selectedFontSize =
      Object.keys(fontSizes).find(
        (key) => fontSizes[key] === (elementStyle.fontSize || '16px')
      ) || 'Medium';

    selectedAlignment = elementStyle.textAlign || 'left';
    textColor = elementStyle.color || '#000000';
  }

  const updateFontSize = () => {
    if (selectedComponentType === 'project') {
      if (subElement === 'title' || subElement === 'both') {
        updateElementStyle($selectedElement, 'fontSize', fontSizes[selectedFontSize], 'title');
      }
      if (subElement === 'description' || subElement === 'both') {
        updateElementStyle($selectedElement, 'fontSize', fontSizes[selectedFontSize], 'description');
      }
    } else {
      updateElementStyle($selectedElement, 'fontSize', fontSizes[selectedFontSize]);
    }
  };

  const updateAlignment = (alignment) => {
    selectedAlignment = alignment;
    if (selectedComponentType === 'project') {
      if (subElement === 'title' || subElement === 'both') {
        updateElementStyle($selectedElement, 'textAlign', alignment, 'title');
      }
      if (subElement === 'description' || subElement === 'both') {
        updateElementStyle($selectedElement, 'textAlign', alignment, 'description');
      }
    } else {
      updateElementStyle($selectedElement, 'textAlign', alignment);
    }
  };

  const updateTextColor = () => {
    if (selectedComponentType === 'project') {
      if (subElement === 'title' || subElement === 'both') {
        updateElementStyle($selectedElement, 'color', textColor, 'title');
      }
      if (subElement === 'description' || subElement === 'both') {
        updateElementStyle($selectedElement, 'color', textColor, 'description');
      }
    } else {
      updateElementStyle($selectedElement, 'color', textColor);
    }
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="text-settings" />
  <label for="text-settings" class="collapse-title text-xl font-medium">
    Text Settings
  </label>
  <div class="collapse-content">
    {#if selectedComponentType === 'project'}
      <!-- Sub-Element Selection -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Apply to:</span>
        </label>
        <select bind:value={subElement} class="select select-bordered">
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div class="divider"></div>
    {/if}

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

<style>
  
</style>