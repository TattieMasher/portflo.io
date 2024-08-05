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
    const userProfileElement = document.getElementById('user-profile');
    if (userProfileElement) {
      userProfileElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      console.warn("Element with ID 'user-profile' not found.");
    }
  };

  const selectProject = (index) => {
    setSelectedElement(`project-${index}`);
    const projectElement = document.getElementById(`project-${index}`);
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectComponent = (projectIndex, componentIndex) => {
    setSelectedElement(`project-${projectIndex}-component-${componentIndex}`);
    const componentElement = document.getElementById(`project-${projectIndex}-component-${componentIndex}`);
    if (componentElement) {
      componentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAddComponent = (projectIndex) => {
    addComponent(projectIndex);
  };

  const handleAddProject = () => {
    addProject();
  };

  const selectPortfolio = () => {
    setSelectedElement('portfolio');
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-2xl font-semibold">Menu</span></li>
    <li>
      <button on:click={selectPortfolio} class={`text-xl block p-2 rounded cursor-pointer ${selectedElement === 'portfolio' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Portfolio Settings</button>
    </li>
    <li>
      <button on:click={selectUser} class={`block p-2 rounded text-center cursor-pointer ${selectedElement === 'user' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>User Profile</button>
    </li>
    {#each $projects as project, projectIndex}
      <li class="menu-title mt-4">
        <div class="flex justify-between items-center">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span on:click={() => selectProject(projectIndex)} class="text-lg font-semibold cursor-pointer">{project.title || 'Untitled Project'}</span>
          <div>
            {#if projectIndex > 0}
              <button class="btn btn-xs btn-outline mx-1" on:click={(e) => { e.stopPropagation(); moveProjectUp(projectIndex); }}>↑</button>
            {/if}
            {#if projectIndex < $projects.length - 1}
              <button class="btn btn-xs btn-outline mx-1" on:click={(e) => { e.stopPropagation(); moveProjectDown(projectIndex); }}>↓</button>
            {/if}
          </div>
        </div>
      </li>
      <ul class="ml-4 space-y-2">
        {#each project.components as component, componentIndex}
          <li class="flex justify-between items-center">
            <div class="flex justify-between items-center">
              <a on:click={() => selectComponent(projectIndex, componentIndex)} class={`${selectedElement === `project-${projectIndex}-component-${componentIndex}` ? 'bg-gray-700' : ''}`}>{component.title || 'Untitled Component'}</a>
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="flex" on:click={(e) => { e.stopPropagation(); moveComponentUp(projectIndex, componentIndex); }} >
                {#if componentIndex > 0}
                  <button class="btn btn-xs btn-outline mx-1" on:click={(e) => { e.stopPropagation(); moveComponentUp(projectIndex, componentIndex); }}>↑</button>
                {/if}
                {#if componentIndex < project.components.length - 1}
                  <button class="btn btn-xs btn-outline mx-1" on:click={(e) => { e.stopPropagation(); moveComponentDown(projectIndex, componentIndex); }}>↓</button>
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ul>
      <li class="mt-2">
        <button class="btn btn-outline btn-sm btn-tertiary w-full" on:click={() => handleAddComponent(projectIndex)}>+ Add Component</button>
      </li>
      <div class="divider"></div> 
    {/each}
    <li class="mt-4">
      <button class="btn btn-outline btn-sm btn-secondary w-full" on:click={handleAddProject}>+ Add Project</button>
    </li>
  </ul>
</aside>

<style>
  aside {
    height: 100%;
    overflow-y: auto;
  }
</style>