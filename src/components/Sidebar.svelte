<script>
  export let user;
  export let projects;
  export let selectedElement;
  export let setSelectedElement;
  export let addComponent;
  export let addProject;
  export let moveComponentUp;
  export let moveComponentDown;
  export let moveProjectUp;
  export let moveProjectDown;

  const selectUser = () => {
    setSelectedElement('user');
    document.getElementById('user-profile').scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const selectProject = (index) => {
    setSelectedElement(`project-${index}`);
    document.getElementById(`project-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const selectComponent = (projectIndex, componentIndex) => {
    setSelectedElement(`project-${projectIndex}-component-${componentIndex}`);
    document.getElementById(`project-${projectIndex}-component-${componentIndex}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleAddComponent = (projectIndex) => {
    addComponent(projectIndex);
  };

  const handleAddProject = () => {
    addProject();
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-xl font-semibold">Menu</span></li>
    <li>
      <a on:click={selectUser} class={`block p-2 rounded ${selectedElement === 'user' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>User Profile</a></li>
    {#each $projects as project, projectIndex}
      <li class="menu-title flex justify-between items-center mt-4">
        <span class="text-lg font-semibold">{project.title || 'Untitled Project'}</span>
        <div>
          {#if projectIndex > 0}
            <button class="btn btn-xs btn-outline mx-1" on:click={() => moveProjectUp(projectIndex)}>↑</button>
          {/if}
          {#if projectIndex < $projects.length - 1}
            <button class="btn btn-xs btn-outline mx-1" on:click={() => moveProjectDown(projectIndex)}>↓</button>
          {/if}
        </div>
      </li>
      <ul class="ml-4 space-y-2">
        {#each project.components as component, componentIndex}
          <li class="flex justify-between items-center">
            <a on:click={() => selectComponent(projectIndex, componentIndex)} class={`block p-2 rounded ${selectedElement === `project-${projectIndex}-component-${componentIndex}` ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>{component.title || 'Untitled Component'}</a>
            <div>
              {#if componentIndex > 0}
                <button class="btn btn-xs btn-outline mx-1" on:click={() => moveComponentUp(projectIndex, componentIndex)}>↑</button>
              {/if}
              {#if componentIndex < project.components.length - 1}
                <button class="btn btn-xs btn-outline mx-1" on:click={() => moveComponentDown(projectIndex, componentIndex)}>↓</button>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
      <li class="mt-2">
        <button class="btn btn-sm btn-tertiary w-full" on:click={() => handleAddComponent(projectIndex)}>+ Add Component</button>
      </li>
    {/each}
    <li class="mt-4">
      <button class="btn btn-sm btn-secondary w-full" on:click={handleAddProject}>+ Add Project</button>
    </li>
  </ul>
</aside>

<style>
  aside {
    height: 100%;
    overflow-y: auto;
  }
</style>