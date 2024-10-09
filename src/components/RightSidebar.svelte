<script>
  import TextSettings from './Controls/TextSettings.svelte';
  import BackgroundSettings from './Controls/BackgroundSettings.svelte';
  import BadgeSettings from './Controls/BadgeSettings.svelte';
  import { selectedElement } from '../stores/selectedElement.js';
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-xl font-semibold">Style Settings</span></li>
    {#if $selectedElement}
      <TextSettings />
      <BackgroundSettings />
      {#if $selectedElement === 'user'}
        <BadgeSettings />
      {/if}
    {/if}
  </ul>
</aside>
