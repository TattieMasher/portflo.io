<script>
  import TextSettings from './Controls/TextSettings.svelte';
  import BackgroundSettings from './Controls/BackgroundSettings.svelte';
  import BadgeSettings from './Controls/BadgeSettings.svelte';
  import ImageSettings from './Controls/ImageSettings.svelte';
  import { selectedElement } from '../stores/selectedElement.js';
  import { projects } from '../stores/projects.js';
  import { copiedStyles } from '../stores/copiedStyles.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { addNotification } from '../stores/notifications.js';
  import { get } from 'svelte/store';

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

  const copyStyles = () => {
    const currentSelectedElement = get(selectedElement);
    const currentElementStyles = get(elementStyles);
    if (currentSelectedElement) {
      const stylesToCopy = currentElementStyles[currentSelectedElement];
      if (stylesToCopy) {
        copiedStyles.set({
          styles: stylesToCopy,
          type: selectedComponentType,
        });
        addNotification('Styles copied successfully.', 'success');
      } else {
        addNotification('No styles to copy.', 'error');
      }
    } else {
      addNotification('No element selected.', 'error');
    }
  };

  const pasteStyles = () => {
    const currentSelectedElement = get(selectedElement);
    const currentCopiedStyles = get(copiedStyles);
    if (currentSelectedElement) {
      const { styles, type } = currentCopiedStyles || {};
      if (styles && type) {
        if (type === selectedComponentType) {
          elementStyles.update((stylesObj) => {
            stylesObj[currentSelectedElement] = { ...styles };
            return stylesObj;
          });
          addNotification('Styles pasted successfully.', 'success');
        } else {
          addNotification('Cannot paste styles: incompatible component types.', 'error');
        }
      } else {
        addNotification('No styles copied.', 'error');
      }
    } else {
      addNotification('No element selected.', 'error');
    }
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title">
      <span class="text-xl font-semibold" style="text-transform: capitalize">
        {selectedComponentType || 'Select an Element'} Style Settings
      </span>
    </li>
    {#if $selectedElement && selectedElement !== 'user'}
      <!-- Copy and Paste Buttons -->
      <div class="flex space-x-2 mb-4">
        <button class="btn btn-sm btn-outline w-2/4 btn-info" on:click={copyStyles}>Copy Style</button>
        <button class="btn btn-sm btn-outline w-2/4 btn-accent" on:click={pasteStyles}>Paste Style</button>
      </div>
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