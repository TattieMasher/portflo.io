<script>
  import UserProfile from '../components/UserProfile.svelte';
  import ProjectList from '../components/ProjectList.svelte';
  import Toolbar from '../components/Toolbar.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import RightSidebar from '../components/RightSidebar.svelte';
  import { get } from 'svelte/store';
  import { projects } from '../stores/projects.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { mode } from '../stores/mode.js';
  import { user } from '../stores/user.js';

  const addComponent = (projectIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, index) => {
        if (index === projectIndex) {
          return {
            ...project,
            components: [
              ...project.components,
              {
                title: '',
                content: '',
                type: 'text',
                style: '',
              },
            ],
          };
        }
        return project;
      });
      console.log('Added component to project', projectIndex);
      return updatedProjects;
    });
  };

  const addProject = () => {
    projects.update((proj) => [
      ...proj,
      {
        title: '',
        description: '',
        project_url: '#',
        components: [],
      },
    ]);
    console.log('Added new project');
  };

  const moveComponentUp = (projectIndex, componentIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, index) => {
        if (index === projectIndex && componentIndex > 0) {
          const updatedComponents = [...project.components];
          [updatedComponents[componentIndex - 1], updatedComponents[componentIndex]] = [
            updatedComponents[componentIndex],
            updatedComponents[componentIndex - 1],
          ];
          return {
            ...project,
            components: updatedComponents,
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const moveComponentDown = (projectIndex, componentIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, index) => {
        if (index === projectIndex && componentIndex < project.components.length - 1) {
          const updatedComponents = [...project.components];
          [updatedComponents[componentIndex], updatedComponents[componentIndex + 1]] = [
            updatedComponents[componentIndex + 1],
            updatedComponents[componentIndex],
          ];
          return {
            ...project,
            components: updatedComponents,
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const moveProjectUp = (projectIndex) => {
    projects.update((proj) => {
      if (projectIndex > 0) {
        const updatedProjects = [...proj];
        [updatedProjects[projectIndex - 1], updatedProjects[projectIndex]] = [
          updatedProjects[projectIndex],
          updatedProjects[projectIndex - 1],
        ];
        return updatedProjects;
      }
      return proj;
    });
  };

  const moveProjectDown = (projectIndex) => {
    projects.update((proj) => {
      if (projectIndex < proj.length - 1) {
        const updatedProjects = [...proj];
        [updatedProjects[projectIndex], updatedProjects[projectIndex + 1]] = [
          updatedProjects[projectIndex + 1],
          updatedProjects[projectIndex],
        ];
        return updatedProjects;
      }
      return proj;
    });
  };

  // Update saveData function to get user data from the store
  const saveData = async () => {
    const projectData = get(projects);
    const stylesData = get(elementStyles);
    const userData = get(user); // Get user data from the store
    try {
      const response = await fetch('https://api-endpoint.com/save', { // TODO, make API lol
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
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
  <Toolbar on:save={saveData} class="w-full" />
  <div class="flex flex-1 overflow-hidden">
    {#if $mode === 'edit'}
      <Sidebar
        {addComponent}
        {addProject}
        {moveComponentUp}
        {moveComponentDown}
        {moveProjectUp}
        {moveProjectDown}
        class="h-full"
      />
    {/if}

    <div class="portfolio flex-1 flex flex-col overflow-y-auto p-6">
      <UserProfile />
      <div class="divider"></div>
      <ProjectList />
    </div>

    {#if $mode === 'edit'}
      <RightSidebar class="h-full" />
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
