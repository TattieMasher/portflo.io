<script>
  import LayoutSettings from '../Controls/LayoutSettings.svelte';
  import TextSettings from '../Controls/TextSettings.svelte';
  import BackgroundSettings from '../Controls/BackgroundSettings.svelte';
  import BadgeSettings from '../Controls/BadgeSettings.svelte';
  import ImageSettings from '../Controls/ImageSettings.svelte';
  import CarouselSettings from '../Controls/CarouselSettings.svelte';
  import TypographySettings from '../Controls/TypographySettings.svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { projects } from '../../stores/projects.js';
  import { copiedStyles } from '../../stores/copiedStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { addNotification } from '../../stores/notifications.js';
  import { get } from 'svelte/store';
  import BorderSettings from '../Controls/BorderSettings.svelte';

  let selectedComponentType = null;

  $: {
    const currentSelectedElement = $selectedElement;
    const currentProjects = $projects;

    if (currentSelectedElement && currentSelectedElement.startsWith('project-')) {
      const parts = currentSelectedElement.split('-');
      const projectIndex = parseInt(parts[1]);
      const project = currentProjects[projectIndex];

      if (parts[2] === 'container' && parts[4] === 'component') {
        const containerIndex = parseInt(parts[3]);
        const componentIndex = parseInt(parts[5]);
        const component = project?.containers?.[containerIndex]?.components?.[componentIndex];
        selectedComponentType = component?.type || null;
      } else if (parts[2] === 'container') {
        const containerIndex = parseInt(parts[3]);
        const container = project?.containers?.[containerIndex];
        selectedComponentType = 'container'; // Set to 'container' when a container is selected
      } else {
        selectedComponentType = 'project';
      }
    } else if (currentSelectedElement === 'user') {
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

  // Delete function
  const deleteSelectedElement = () => {
    const currentSelectedElement = get(selectedElement);
    if (!currentSelectedElement) {
      addNotification('No element selected to delete.', 'error');
      return;
    }

    if (currentSelectedElement.startsWith('project-')) {
      const parts = currentSelectedElement.split('-');
      const projectIndex = parseInt(parts[1]);

      if (parts[2] === 'container' && parts[4] === 'component') {
        // Delete component
        const containerIndex = parseInt(parts[3]);
        const componentIndex = parseInt(parts[5]);
        projects.update((proj) => {
          const updatedProjects = proj.map((project, idx) => {
            if (idx === projectIndex) {
              const updatedContainers = project.containers.map((container, cIdx) => {
                if (cIdx === containerIndex) {
                  const updatedComponents = container.components.filter((_, compIdx) => compIdx !== componentIndex);
                  return {
                    ...container,
                    components: updatedComponents,
                  };
                }
                return container;
              });
              return {
                ...project,
                containers: updatedContainers,
              };
            }
            return project;
          });
          return updatedProjects;
        });
        addNotification('Component deleted.', 'success');
      } else if (parts[2] === 'container') {
        // Delete container
        const containerIndex = parseInt(parts[3]);
        projects.update((proj) => {
          const updatedProjects = proj.map((project, idx) => {
            if (idx === projectIndex) {
              const updatedContainers = project.containers.filter((_, cIdx) => cIdx !== containerIndex);
              return {
                ...project,
                containers: updatedContainers,
              };
            }
            return project;
          });
          return updatedProjects;
        });
        addNotification('Container deleted.', 'success');
      } else {
        // Delete project
        projects.update((proj) => {
          const updatedProjects = proj.filter((_, idx) => idx !== projectIndex);
          return updatedProjects;
        });
        addNotification('Project deleted.', 'success');
      }
    } else if (currentSelectedElement === 'user') {
      addNotification('Cannot delete user profile.', 'error');
    } else {
      addNotification('Selected element cannot be deleted.', 'error');
    }

    // Clear selectedElement
    selectedElement.set(null);
  };
</script>

{#if selectedComponentType}
  <aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
    <ul class="space-y-4">
      <li class="menu-title">
        <span class="text-xl font-semibold" style="text-transform: capitalize">
          {selectedComponentType || 'Select an Element'} Settings
        </span>
      </li>
      {#if $selectedElement}
        <!-- Copy, Paste, and Delete Buttons -->
        <div class="flex space-x-2 mb-4">
          <button class="btn btn-sm btn-outline btn-info w-1/2" on:click={copyStyles}>Copy Style</button>
          <button class="btn btn-sm btn-outline btn-accent w-1/2" on:click={pasteStyles}>Paste Style</button>
        </div>

        <!-- Show LayoutSettings only for containers -->
        {#if selectedComponentType === 'container'}
          <LayoutSettings />
        {/if}

        <!-- Include TextSettings for text components and projects -->
        {#if selectedComponentType === 'text' || selectedComponentType === 'project' || $selectedElement === 'user'}
          <TypographySettings />
          <TextSettings />
        {/if}

        <!-- Include ImageSettings for image components -->
        {#if selectedComponentType === 'image'}
          <ImageSettings />
        {/if}

        <!-- Include CarouselSettings for carousel components -->
        {#if selectedComponentType === 'carousel'}
          <CarouselSettings />
        {/if}

        <!-- Include BackgroundSettings for all components -->
        <BackgroundSettings />

        <BorderSettings />

        <!-- Include BadgeSettings for the user profile and project -->
        {#if $selectedElement === 'user' || selectedComponentType === 'project'}
          <BadgeSettings />
        {/if}

        {#if $selectedElement !== 'user'}
          <button class="btn btn-sm btn-outline btn-error w-full" on:click={deleteSelectedElement}>Delete Item</button>
        {/if}
      {/if}
    </ul>
  </aside>
{/if}

<style>
  aside {
    height: 100%;
  }
</style>