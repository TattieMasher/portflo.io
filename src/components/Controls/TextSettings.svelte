<script>
  export let styles;
  export let updateStyle;

  const fontSizes = {
    Small: '12px',
    Medium: '16px',
    Large: '20px',
    XL: '24px'
  };

  const updateFontSize = (size) => {
    updateStyle('fontSize', fontSizes[size]);
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
            <input type="radio" name="font-size" value={fontSizes[size]} on:change={() => updateFontSize(size)} />
            <span class="ml-2">{size}</span>
          </label>
        {/each}
      </div>
    </div>
    <div class="form-control">
      <label for="text-color-control" class="label">
        <span class="label-text">Colour</span>
      </label>
      <input id="text-color-control" type="color" class="input input-bordered" bind:value={$styles.color} on:input={(e) => updateStyle('color', e.target.value)} />
    </div>
  </div>
</div>