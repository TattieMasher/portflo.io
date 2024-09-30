<!-- components/Controls/TextSettings.svelte -->
<script>
  import Icon from '@iconify/svelte';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';

  const fontSizes = {
    Small: '12px',
    Medium: '16px',
    Large: '20px',
    XL: '24px',
  };

  const updateFontSize = (size) => {
    const elementId = $selectedElement;
    if (elementId) {
      elementStyles.update((styles) => {
        const updatedStyles = {
          ...styles,
          [elementId]: {
            ...styles[elementId],
            fontSize: fontSizes[size],
          },
        };
        return updatedStyles;
      });
    }
  };

  const alignments = ['left', 'center', 'right', 'justify'];

  const updateAlignment = (alignment) => {
    const elementId = $selectedElement;
    if (elementId) {
      elementStyles.update((styles) => ({
        ...styles,
        [elementId]: {
          ...styles[elementId],
          textAlign: alignment,
        },
      }));
    }
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
              value={fontSizes[size]}
              checked={$selectedElementStyles.fontSize === fontSizes[size]}
              on:change={() => updateFontSize(size)}
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
            class:btn-active={$selectedElementStyles.textAlign === alignment}
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
        <span class="label-text">Colour</span>
      </label>
      <input
        id="text-color-control"
        type="color"
        class="input input-bordered"
        value={$selectedElementStyles.color || '#000000'}
        on:input={(e) => {
          const elementId = $selectedElement;
          if (elementId) {
            elementStyles.update((styles) => ({
              ...styles,
              [elementId]: {
                ...styles[elementId],
                color: e.target.value,
              },
            }));
          }
        }}
      />
    </div>
  </div>
</div>