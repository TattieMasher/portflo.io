<script>
  import TextSettings from './Controls/TextSettings.svelte';
  import BackgroundSettings from './Controls/BackgroundSettings.svelte';
  import BadgeSettings from './Controls/BadgeSettings.svelte';
  import ImageSettings from './Controls/ImageSettings.svelte';
  import { selectedElement } from '../stores/selectedElement.js';
  import { projects } from '../stores/projects.js';

  let selectedComponentType = null;

  $: {
    if ($selectedElement && $selectedElement.startsWith('project-')) {
      const parts = $selectedElement.split('-');
      const projectIndex = parseInt(parts[1]);
      const project = $projects[projectIndex];

      if (parts[2] === 'container' && parts[4] === 'component') {
        const containerIndex = parseInt(parts[3]);
        const componentIndex = parseInt(parts[5]);
        const component = project?.containers?.[containerIndex]?.components?.[componentIndex];
        selectedComponentType = component?.type || null;
      } else if (parts[2] === 'container') {
        selectedComponentType = 'container';
      } else {
        selectedComponentType = 'project';
      }
    } else if ($selectedElement === 'user') {
      selectedComponentType = 'user';
    } else {
      selectedComponentType = null;
    }
  }
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-xl font-semibold">{selectedComponentType} Style Settings</span></li>
    {#if $selectedElement}
      <!-- Include TextSettings for text components -->
      {#if selectedComponentType === 'text' || $selectedElement === 'user'}
        <TextSettings />
      {/if}

      <!-- Include ImageSettings for image components -->
      {#if selectedComponentType === 'image'}
        <ImageSettings />
      {/if}

      <!-- Include BackgroundSettings for all components -->
      <BackgroundSettings />

      <!-- Include BadgeSettings for the user profile -->
      {#if $selectedElement === 'user'}
        <BadgeSettings />
      {/if}
    {/if}
  </ul>
</aside>