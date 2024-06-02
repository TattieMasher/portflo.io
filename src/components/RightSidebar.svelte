<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import TextSettings from './Controls/TextSettings.svelte';
  import BackgroundSettings from './Controls/BackgroundSettings.svelte';

  export let selectedElement;
  export let setSelectedElement;

  let styles = writable({
    fontSize: '16px',
    backgroundColor: '#ffffff',
    color: '#000000'
  });

  onMount(() => {
    if (selectedElement === 'portfolio') {
      styles.set({
        fontSize: document.body.style.fontSize || '16px',
        backgroundColor: document.body.style.backgroundColor || '#ffffff',
        color: document.body.style.color || '#000000'
      });
    } else if (selectedElement) {
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
    if (selectedElement === 'portfolio') {
      document.body.style[property] = value;
    } else {
      const element = document.getElementById(selectedElement);
      if (element) {
        element.style[property] = value;
      }
    }
    styles.update(styles => {
      styles[property] = value;
      return styles;
    });
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-xl font-semibold">Style Settings</span></li>
    {#if $selectedElement}
      <TextSettings {styles} {updateStyle} />
      <BackgroundSettings {styles} {updateStyle} />
    {/if}
  </ul>
</aside>