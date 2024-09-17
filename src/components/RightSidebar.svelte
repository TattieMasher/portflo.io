<script>
  import { styles } from '../stores/styles.js'; // Import styles from the store
  import TextSettings from './Controls/TextSettings.svelte';
  import BackgroundSettings from './Controls/BackgroundSettings.svelte';

  export let selectedElement;
  export let setSelectedElement;

  const updateStyle = (property, value) => {
    if (selectedElement === 'portfolio') {
      document.body.style[property] = value;
    } else {
      const element = document.getElementById(selectedElement);
      if (element) {
        element.style[property] = value;
      }
    }
    styles.update((s) => ({ ...s, [property]: value }));
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-xl font-semibold">Style Settings</span></li>
    {#if selectedElement}
      <TextSettings {updateStyle} />
      <BackgroundSettings {updateStyle} />
    {/if}
  </ul>
</aside>