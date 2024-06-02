<script>
  import UserProfile from '../components/UserProfile.svelte';
  import ProjectList from '../components/ProjectList.svelte';
  import Toolbar from '../components/Toolbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import RightSidebar from '../components/RightSidebar.svelte';
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

  projects.subscribe(value => {
    console.log('Projects updated:', value);
  });

  const addComponent = (projectIndex) => {
    projects.update(proj => {
      proj[projectIndex].components.push({
        title: '',
        content: '',
        type: 'text',
        style: ''
      });
      console.log('Added component to project', projectIndex);
      return proj;
    });
  };

  const addProject = () => {
    projects.update(proj => {
      proj.push({
        title: '',
        description: '',
        project_url: '#',
        components: []
      });
      console.log('Added new project');
      return proj;
    });
  };

  const moveComponentUp = (projectIndex, componentIndex) => {
    projects.update(proj => {
      const components = proj[projectIndex].components;
      [components[componentIndex - 1], components[componentIndex]] = [components[componentIndex], components[componentIndex - 1]];
      return proj;
    });
  };

  const moveComponentDown = (projectIndex, componentIndex) => {
    projects.update(proj => {
      const components = proj[projectIndex].components;
      [components[componentIndex + 1], components[componentIndex]] = [components[componentIndex], components[componentIndex + 1]];
      return proj;
    });
  };

  const moveProjectUp = (projectIndex) => {
    projects.update(proj => {
      [proj[projectIndex - 1], proj[projectIndex]] = [proj[projectIndex], proj[projectIndex - 1]];
      return proj;
    });
  };

  const moveProjectDown = (projectIndex) => {
    projects.update(proj => {
      [proj[projectIndex + 1], proj[projectIndex]] = [proj[projectIndex], proj[projectIndex + 1]];
      return proj;
    });
  };
</script>

<main class="flex flex-col h-screen">
  <Toolbar {mode} class="w-full" />
  <div class="flex flex-1 overflow-hidden">
    {#if $mode == 'edit'}
      <Sidebar
        {user}
        {projects}
        {selectedElement}
        {setSelectedElement}
        {addComponent}
        {addProject}
        {moveComponentUp}
        {moveComponentDown}
        {moveProjectUp}
        {moveProjectDown}
        class="h-full"
      />
    {/if}
    <div class="flex-1 flex flex-col overflow-y-auto p-6">
      <UserProfile {user} isEditMode={$mode === 'edit'} selectedElement={$selectedElement} />
      <ProjectList {projects} isEditMode={$mode === 'edit'} selectedElement={$selectedElement} />
    </div>
    {#if $mode == 'edit'}
      <RightSidebar {selectedElement} {setSelectedElement} class="h-full" />
    {/if}
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