<script>
  import { elementStyles } from '../../stores/elementStyles.js';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';

  // Default values for image width and height
  const defaultWidth = '100%';
  const defaultHeight = 'auto';
  const defaultBorderRadius = '0px';

  // Reactive variables for width, height, and border-radius
  $: imageWidth = $selectedElementStyles.width || defaultWidth;
  $: imageHeight = $selectedElementStyles.height || defaultHeight;
  $: borderRadius = $selectedElementStyles.borderRadius || defaultBorderRadius;

  const updateStyle = (property, value) => {
    const elementId = $selectedElement;
    if (elementId) {
      elementStyles.update((styles) => {
        const updatedStyles = { ...styles };
        if (!updatedStyles[elementId]) {
          updatedStyles[elementId] = {};
        }
        updatedStyles[elementId][property] = value;
        return updatedStyles;
      });
    }
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="image-settings" />
  <label for="image-settings" class="collapse-title text-xl font-medium">
    Image Settings
  </label>
  <div class="collapse-content">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Width</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={imageWidth}
        on:input={(e) => updateStyle('width', e.target.value)}
        placeholder="e.g., 100%, 300px"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Height</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={imageHeight}
        on:input={(e) => updateStyle('height', e.target.value)}
        placeholder="e.g., auto, 200px"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Border Radius</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={borderRadius}
        on:input={(e) => updateStyle('borderRadius', e.target.value)}
        placeholder="e.g., 0px, 50%"
      />
    </div>
  </div>
</div>
