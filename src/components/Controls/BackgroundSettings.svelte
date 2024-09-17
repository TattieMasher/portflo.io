<script>
  import { styles } from '../../stores/styles.js'; // Import styles from the store
  export let updateStyle;

  // Local variable to track whether the background is transparent
  let isTransparent;

  // Reactive statement to update isTransparent when styles change
  $: isTransparent = $styles.backgroundColor === 'transparent';

  // Function to handle checkbox change
  const toggleTransparency = () => {
    updateStyle('backgroundColor', isTransparent ? '#ffffff' : 'transparent');
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
          <span class="label-text">Background Colour</span>
        </label>
        <input
          id="background-color-control"
          type="color"
          class="input input-bordered"
          bind:value={$styles.backgroundColor}
          on:input={(e) => updateStyle('backgroundColor', e.target.value)}
        />
      {/if}
    </div>
  </div>
</div>