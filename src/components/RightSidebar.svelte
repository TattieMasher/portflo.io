<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  export let selectedElement;
  export let setSelectedElement;

  let styles = writable({
    fontSize: '16px',
    backgroundColor: '#ffffff',
    color: '#000000'
  });

  const fontSizes = {
    small: '12px',
    medium: '16px',
    large: '20px',
    extraLarge: '24px'
  };

  onMount(() => {
    if (selectedElement) {
      const element = document.getElementById(selectedElement);
      if (element) {
        styles.set({
          fontSize: element.style.fontSize || '16px',
          backgroundColor: element.style.backgroundColor || '#ffffff',
          color: element.style.color || '#000000'
        });
      }
    }
  });

  const updateStyle = (property, value) => {
    const element = document.getElementById(selectedElement);
    if (element) {
      element.style[property] = value;
      styles.update(styles => {
        styles[property] = value;
        return styles;
      });
    }
  };

  const updateFontSize = (size) => {
    updateStyle('fontSize', fontSizes[size]);
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-xl font-semibold">Style Settings</span></li>
    {#if $selectedElement}
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
              <label class="flex items-center">
                <input type="radio" name="font-size" value="small" on:change={() => updateFontSize('small')} checked={$styles.fontSize === '12px'} class="radio" />
                <span class="ml-2">Small</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="font-size" value="medium" on:change={() => updateFontSize('medium')} checked={$styles.fontSize === '16px'} class="radio" />
                <span class="ml-2">Medium</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="font-size" value="large" on:change={() => updateFontSize('large')} checked={$styles.fontSize === '20px'} class="radio" />
                <span class="ml-2">Large</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="font-size" value="extraLarge" on:change={() => updateFontSize('extraLarge')} checked={$styles.fontSize === '24px'} class="radio" />
                <span class="ml-2">Extra Large</span>
              </label>
            </div>
          </div>
          <div class="form-control">
            <label for="text-color-control" class="label">
              <span class="label-text">Color</span>
            </label>
            <input id="text-color-control" type="color" class="input input-bordered" bind:value={$styles.color} on:input={(e) => updateStyle('color', e.target.value)} />
          </div>
        </div>
      </div>
      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" id="background-settings" /> 
        <label for="background-settings" class="collapse-title text-xl font-medium">
          Background Settings
        </label>
        <div class="collapse-content"> 
          <div class="form-control">
            <label for="background-color-control" class="label">
              <span class="label-text">Background Color</span>
            </label>
            <input id="background-color-control" type="color" class="input input-bordered" bind:value={$styles.backgroundColor} on:input={(e) => updateStyle('backgroundColor', e.target.value)} />
          </div>
        </div>
      </div>
    {/if}
  </ul>
</aside>

<style>
  .collapse input[type="checkbox"] {
    display: none;
  }
  .collapse input[type="checkbox"]:checked + .collapse-title + .collapse-content {
    display: block;
  }
  .collapse-content {
    display: none;
  }
</style>