<script>
  import UserProfile from '../components/UserProfile.svelte';
  import ProjectList from '../components/ProjectList.svelte';
  import Toolbar from '../components/Toolbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import RightSidebar from '../components/RightSidebar.svelte';
  import { writable, get } from 'svelte/store';
  import { projects } from '../stores/projects.js'; // Import projects from the store
  import { styles } from '../stores/styles.js';

  let mode = writable('edit');
  let selectedElement = writable(null);

  const setSelectedElement = (element) => {
    console.log('Selected Element:', element);
    selectedElement.set(element);
  };

  let user = {
    full_name: 'John Doe',
    bio: 'A passionate developer.',
    profile_picture:
      'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/KilmarnockLogo.svg/1200px-KilmarnockLogo.svg.png',
  };

  // Update functions to work with the projects store
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

  const saveData = async () => {
    const projectData = get(projects);
    const stylesData = get(styles);
    try {
      const response = await fetch('https://your-api-endpoint.com/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          projects: projectData,
          styles: stylesData,
        }),
      });
      const result = await response.json();
      console.log('Data saved successfully:', result);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
</script>

<main class="flex flex-col h-screen">
  <Toolbar {mode} on:save={saveData} class="w-full" />
  <div class="flex flex-1 overflow-hidden">
    <Sidebar
      {user}
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
    <div class="flex-1 flex flex-col overflow-y-auto p-6">
      <UserProfile {user} isEditMode={$mode === 'edit'} selectedElement={$selectedElement} />
      <ProjectList isEditMode={$mode === 'edit'} selectedElement={$selectedElement} {setSelectedElement} />
    </div>
    <RightSidebar {selectedElement} {setSelectedElement} class="h-full" />
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