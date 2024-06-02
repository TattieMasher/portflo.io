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

  onMount(() => {
    $: if (selectedElement) {
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
            <label class="label">
              <span class="label-text">Font Size</span>
            </label>
            <input type="text" class="input input-bordered" bind:value={$styles.fontSize} on:input={(e) => updateStyle('fontSize', e.target.value)} />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Color</span>
            </label>
            <input type="color" class="input input-bordered" bind:value={$styles.color} on:input={(e) => updateStyle('color', e.target.value)} />
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
            <label class="label">
              <span class="label-text">Background Color</span>
            </label>
            <input type="color" class="input input-bordered" bind:value={$styles.backgroundColor} on:input={(e) => updateStyle('backgroundColor', e.target.value)} />
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