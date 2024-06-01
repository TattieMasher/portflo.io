<script>
  export let user;
  export let projects;
  export let selectedElement;
  export let setSelectedElement;
  export let addComponent;
  export let addProject;

  const selectUser = () => {
    setSelectedElement('user');
  };

  const selectProject = (index) => {
    setSelectedElement(`project-${index}`);
  };

  const selectComponent = (projectIndex, componentIndex) => {
    setSelectedElement(`project-${projectIndex}-component-${componentIndex}`);
  };

  const handleAddComponent = (projectIndex) => {
    addComponent(projectIndex);
  };

  const handleAddProject = () => {
    addProject();
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full">
  <ul>
    <li class="menu-title"><span>Menu</span></li>
    <li><a on:click={selectUser} class={selectedElement === 'user' ? 'bg-gray-700' : ''}>User Profile</a></li>
    {#each $projects as project, projectIndex}
      <li class="menu-title"><span>{project.title || 'Untitled Project'}</span></li>
      {#each project.components as component, componentIndex}
        <li><a on:click={() => selectComponent(projectIndex, componentIndex)} class={selectedElement === `project-${projectIndex}-component-${componentIndex}` ? 'bg-gray-700' : ''}>{component.title || 'Untitled Component'}</a></li>
      {/each}
      <li class="mt-2">
        <button class="btn btn-sm btn-primary w-full" on:click={() => handleAddComponent(projectIndex)}>+ Add Component</button>
      </li>
    {/each}
    <li class="mt-4">
      <button class="btn btn-sm btn-primary w-full" on:click={handleAddProject}>+ Add Project</button>
    </li>
  </ul>
</aside>