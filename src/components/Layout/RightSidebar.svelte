<script>
  import Settings from '../Controls/Settings.svelte';
  import { rootStore } from '../../stores/rootStore';
  import { get } from 'svelte/store';

  const { projects, selectedElement, selectedElementStyles, copiedStyles, elementStyles, notifications } = rootStore;

  let selectedComponentType = null;

  function determineSelectedComponentType(selectedElement, projects) {
    if (selectedElement?.startsWith('project-')) {
      const parts = selectedElement.split('-');
      const projectIndex = parseInt(parts[1]);
      const project = projects[projectIndex];

      if (parts[2] === 'container' && parts[4] === 'component') {
        const containerIndex = parseInt(parts[3]);
        const componentIndex = parseInt(parts[5]);
        const component = project?.containers?.[containerIndex]?.components?.[componentIndex];
        return component?.type || null;
      } else if (parts[2] === 'container') {
        return 'container';
      } else {
        return 'project';
      }
    } else if (selectedElement === 'user') {
      return 'user';
    }
    return null;
  }

  $: selectedComponentType = determineSelectedComponentType($selectedElement, $projects);

  const addNotification = (message, type) => {
    notifications.update((n) => [...n, { message, type, id: Date.now() }]);
  };

  const copyStyles = () => {
    const currentSelectedElement = get(selectedElement);
    const currentElementStyles = get(elementStyles);

    if (!currentSelectedElement) {
      addNotification('No element selected.', 'error');
      return;
    }

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
  };

  const pasteStyles = () => {
    const currentSelectedElement = get(selectedElement);
    const currentCopiedStyles = get(copiedStyles);

    if (!currentSelectedElement) {
      addNotification('No element selected.', 'error');
      return;
    }

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
  };

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
        const containerIndex = parseInt(parts[3]);
        const componentIndex = parseInt(parts[5]);
        projects.update((proj) => {
          proj[projectIndex]?.containers[containerIndex]?.components.splice(componentIndex, 1);
          return proj;
        });
        addNotification('Component deleted.', 'success');
      } else if (parts[2] === 'container') {
        projects.update((proj) => {
          proj[projectIndex]?.containers.splice(parseInt(parts[3]), 1);
          return proj;
        });
        addNotification('Container deleted.', 'success');
      } else {
        projects.update((proj) => {
          proj.splice(projectIndex, 1);
          return proj;
        });
        addNotification('Project deleted.', 'success');
      }
    } else if (currentSelectedElement === 'user') {
      addNotification('Cannot delete user profile.', 'error');
    } else {
      addNotification('Selected element cannot be deleted.', 'error');
    }

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
        <div class="flex space-x-2 mb-4">
          <button class="btn btn-sm btn-outline btn-info w-1/2" on:click={copyStyles}>Copy Style</button>
          <button class="btn btn-sm btn-outline btn-accent w-1/2" on:click={pasteStyles}>Paste Style</button>
        </div>

        <Settings {selectedComponentType} />

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
