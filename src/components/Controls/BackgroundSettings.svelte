<script>
  import { elementStyles } from '../../stores/elementStyles.js';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';

  let isTransparent = false;

  // Reactive statement to update isTransparent based on backgroundColor
  $: isTransparent = !$selectedElementStyles.backgroundColor || $selectedElementStyles.backgroundColor === 'transparent';

  const toggleTransparency = () => {
    const elementId = $selectedElement;
    if (elementId) {
      elementStyles.update((styles) => ({
        ...styles,
        [elementId]: {
          ...styles[elementId],
          backgroundColor: isTransparent ? '#ffffff' : 'transparent',
        },
      }));
    }
  };
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
            on:change={toggleTransparency}
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
          value={$selectedElementStyles.backgroundColor || '#ffffff'}
          on:input={(e) => {
            const elementId = $selectedElement;
            if (elementId) {
              elementStyles.update((styles) => ({
                ...styles,
                [elementId]: {
                  ...styles[elementId],
                  backgroundColor: e.target.value,
                },
              }));
            }
          }}
        />
      {/if}
    </div>
  </div>
</div>
