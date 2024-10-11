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

  const addProject = () => {
    projects.update((proj) => [
      ...proj,
      {
        title: '',
        description: '',
        project_url: '#',
        containers: [],
      },
    ]);
    console.log('Added new project');
  };

  const addContainer = (projectIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, index) => {
        if (index === projectIndex) {
          return {
            ...project,
            containers: [
              ...project.containers,
              {
                layout: 'article',
                components: [],
              },
            ],
          };
        }
        return project;
      });
      console.log('Added container to project', projectIndex);
      return updatedProjects;
    });
  };

  const addComponent = (projectIndex, containerIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, index) => {
        if (index === projectIndex) {
          const updatedContainers = project.containers.map((container, cIndex) => {
            if (cIndex === containerIndex) {
              return {
                ...container,
                components: [
                  ...container.components,
                  {
                    title: '',
                    content: '',
                    type: 'text', // Default type is 'text'
                  },
                ],
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
      console.log('Added component to container', containerIndex, 'in project', projectIndex);
      return updatedProjects;
    });
  };

  // Define move functions for components, containers, and projects
  const moveComponentUp = (projectIndex, containerIndex, componentIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, idx) => {
        if (idx === projectIndex) {
          const updatedContainers = project.containers.map((container, cIdx) => {
            if (cIdx === containerIndex && componentIndex > 0) {
              const updatedComponents = [...container.components];
              [updatedComponents[componentIndex - 1], updatedComponents[componentIndex]] = [
                updatedComponents[componentIndex],
                updatedComponents[componentIndex - 1],
              ];
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
  };

  const moveComponentDown = (projectIndex, containerIndex, componentIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, idx) => {
        if (idx === projectIndex) {
          const updatedContainers = project.containers.map((container, cIdx) => {
            if (cIdx === containerIndex && componentIndex < container.components.length - 1) {
              const updatedComponents = [...container.components];
              [updatedComponents[componentIndex], updatedComponents[componentIndex + 1]] = [
                updatedComponents[componentIndex + 1],
                updatedComponents[componentIndex],
              ];
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
  };

  const moveContainerUp = (projectIndex, containerIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, idx) => {
        if (idx === projectIndex && containerIndex > 0) {
          const updatedContainers = [...project.containers];
          [updatedContainers[containerIndex - 1], updatedContainers[containerIndex]] = [
            updatedContainers[containerIndex],
            updatedContainers[containerIndex - 1],
          ];
          return {
            ...project,
            containers: updatedContainers,
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const moveContainerDown = (projectIndex, containerIndex) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, idx) => {
        if (idx === projectIndex && containerIndex < project.containers.length - 1) {
          const updatedContainers = [...project.containers];
          [updatedContainers[containerIndex], updatedContainers[containerIndex + 1]] = [
            updatedContainers[containerIndex + 1],
            updatedContainers[containerIndex],
          ];
          return {
            ...project,
            containers: updatedContainers,
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

  const saveData = async () => {
    const projectData = get(projects);
    const stylesData = get(elementStyles);
    const userData = get(user); // Get user data from the store
    try {
      const response = await fetch('https://api-endpoint.com/save', { // Replace with your API endpoint
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
        {addContainer}
        {addProject}
        {moveComponentUp}
        {moveComponentDown}
        {moveContainerUp}
        {moveContainerDown}
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