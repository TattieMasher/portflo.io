<script>
  import { rootStore } from '../../stores/rootStore';
  import { updateElementStyle } from '../../utils/updateStyles.js';

  const { selectedElement, elementStyles } = rootStore;

  let imageWidth = 100; // Percentage value
  let imageHeight = 'auto';
  let borderRadius = 0; // Percentage value
  let previousSelectedElement = null;

  // Initialize local variables when the selected element changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLocalVariables();
  }

  function initializeLocalVariables() {
    const styles = $elementStyles[$selectedElement]?.image || {};
    imageWidth = styles.width?.endsWith('%') ? parseInt(styles.width) : 100;
    imageHeight = styles.height || 'auto';
    borderRadius = parseInt(styles.borderRadius) || 0;
  }

  // Reactive updates to element styles
  $: updateElementStyle($selectedElement, 'width', `${imageWidth}%`, 'image');
  $: updateElementStyle(
    $selectedElement,
    'height',
    imageHeight === 'auto' ? 'auto' : `${imageHeight}px`,
    'image'
  );
  $: updateElementStyle($selectedElement, 'borderRadius', `${borderRadius}%`, 'image');

  // Update height explicitly
  const updateHeight = () => {
    updateElementStyle(
      $selectedElement,
      'height',
      imageHeight === 'auto' ? 'auto' : `${imageHeight}px`,
      'image'
    );
  };
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="image-settings" />
  <label for="image-settings" class="collapse-title text-xl font-medium">
    Image Settings
  </label>
  <div class="collapse-content">
    <!-- Width Setting -->
    <div class="form-control">
      <label class="label">
        <span class="label-text">Width: {imageWidth}%</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        bind:value={imageWidth}
        class="range range-primary"
      />
    </div>

    <!-- Height Setting -->
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Height (px)</span>
      </label>
      <input
        type="text"
        class="input input-bordered"
        bind:value={imageHeight}
        on:input={updateHeight}
        placeholder="e.g., auto, 200"
      />
    </div>

    <!-- Border Radius Setting -->
    <div class="form-control mt-4">
      <label class="label">
        <span class="label-text">Border Radius: {borderRadius}%</span>
      </label>
      <input
        type="range"
        min="1"
        max="50"
        bind:value={borderRadius}
        class="range range-primary"
      />
    </div>
  </div>
</div>
