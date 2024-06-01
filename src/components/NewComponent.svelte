<script>
  import UserProfile from '../components/UserProfile.svelte';
  import ProjectList from '../components/ProjectList.svelte';
  import Toolbar from '../components/Toolbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import { writable } from 'svelte/store';

  let mode = writable('edit');
  let selectedElement = writable(null);

  const setSelectedElement = (element) => {
    selectedElement.set(element);
  };

  let user = {
    full_name: 'John Doe',
    bio: 'A passionate developer.',
    profile_picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/KilmarnockLogo.svg/1200px-KilmarnockLogo.svg.png'
  };

  let projects = writable([
    {
      title: 'Project 1',
      description: 'Description of project 1',
      project_url: '#',
      components: [
        {
          title: 'Component 1.1',
          content: 'This is a text component in Project 1.',
          type: 'text',
          style: 'text-center border p-4 rounded bg-blue-100'
        },
        {
          title: 'Component 1.2',
          content: 'https://via.placeholder.com/300',
          type: 'image',
          style: 'border p-4 rounded bg-red-100'
        }
      ]
    },
    {
      title: 'Project 2',
      description: 'Description of project 2',
      project_url: '#',
      components: [
        {
          title: 'Component 2.1',
          content: 'This is a text component in Project 2.',
          type: 'text',
          style: 'text-center bg-green-100'
        }
      ]
    }
  ]);

  const addComponent = (projectIndex, component) => {
    projects.update(proj => {
      proj[projectIndex].components.push(component);
      return proj;
    });
  };

  const addProject = (project) => {
    projects.update(proj => {
      proj.push(project);
      return proj;
    });
  };

  let newProjectTitle = "";
  let newProjectDescription = "";
  let newComponentTitle = "";
  let newComponentContent = "";

  let projectIndex = null;

  $: if ($selectedElement && $selectedElement.startsWith('project-') && $selectedElement.endsWith('-new-component')) {
    projectIndex = parseInt($selectedElement.split('-')[1]);
  } else {
    projectIndex = null;
  }

  const handleAddComponent = (projectIndex) => {
    addComponent(projectIndex, {
      title: newComponentTitle,
      content: newComponentContent,
      type: 'text',
      style: 'text-center border p-4 rounded bg-blue-100'
    });
    newComponentTitle = "";
    newComponentContent = "";
    selectedElement.set(null);
  };

  const handleAddProject = () => {
    console.log("Adding new project:", newProjectTitle, newProjectDescription);
    addProject({
      title: newProjectTitle,
      description: newProjectDescription,
      project_url: '#',
      components: []
    });
    console.log("New project added to store:", $projects);
    newProjectTitle = "";
    newProjectDescription = "";
    selectedElement.set(null);
  };
</script>

<main class="flex flex-col h-screen">
  <Toolbar {mode} class="w-full" />
  <div class="flex flex-1 overflow-hidden">
    <Sidebar {user} {projects} {selectedElement} {setSelectedElement} {addComponent} {addProject} class="h-full" />
    <div class="flex-1 flex flex-col overflow-y-auto p-6">
      <UserProfile {user} isEditMode={$mode === 'edit'} selectedElement={$selectedElement} />
      <ProjectList {projects} isEditMode={$mode === 'edit'} selectedElement={$selectedElement} />

      {#if $mode === 'edit'}
        {#if projectIndex !== null}
          <div class="p-4 bg-gray-100 border rounded mt-4">
            <h2 class="font-bold mb-2">Add New Component to {$projects[projectIndex].title}</h2>
            <input type="text" bind:value={newComponentTitle} placeholder="Component Title" class="input input-bordered w-full mb-2" />
            <textarea bind:value={newComponentContent} placeholder="Component Content" class="textarea textarea-bordered w-full mb-2"></textarea>
            <button on:click={() => handleAddComponent(projectIndex)} class="btn btn-primary w-full mb-4">Add Component</button>
          </div>
        {/if}

        {#if $selectedElement === 'new-project'}
          <div class="p-4 bg-gray-100 border rounded mt-4">
            <h2 class="font-bold mb-2">Add New Project</h2>
            <input type="text" bind:value={newProjectTitle} placeholder="Project Title" class="input input-bordered w-full mb-2" />
            <textarea bind:value={newProjectDescription} placeholder="Project Description" class="textarea textarea-bordered w-full mb-2"></textarea>
            <button on:click={handleAddProject} class="btn btn-primary w-full">Add Project</button>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }
  .flex-1 {
    flex: 1;
    overflow-y: auto;
  }
</style>
