<script>
  import TextSettings from './Controls/TextSettings.svelte';
  import BackgroundSettings from './Controls/BackgroundSettings.svelte';
  import BadgeSettings from './Controls/BadgeSettings.svelte';
  import ImageSettings from './Controls/ImageSettings.svelte';
  import { selectedElement } from '../stores/selectedElement.js';
  import { projects } from '../stores/projects.js';

  // Get the selected component type
  let selectedComponentType = null;

  $: {
    if ($selectedElement && $selectedElement.startsWith('project-')) {
      const [_, projectIndex, __, componentIndex] = $selectedElement.split('-');
      const project = $projects[projectIndex];
      if (project && componentIndex !== undefined) {
        const component = project.components[componentIndex];
        selectedComponentType = component?.type || null;
      } else {
        selectedComponentType = null;
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