<script>
  import { rootStore } from '../../stores/rootStore';
  import { get } from 'svelte/store';

  // Destructure only the needed parts from rootStore
  const { projects, selectedElement } = rootStore;

  export let addContainer;
  export let addComponent;
  export let addProject;
  export let moveComponentUp;
  export let moveComponentDown;
  export let moveContainerUp;
  export let moveContainerDown;
  export let moveProjectUp;
  export let moveProjectDown;

  const selectPortfolio = () => {
    selectedElement.set('portfolio');
    const portfolioElement = document.getElementById('portfolio');
    if (portfolioElement) {
      portfolioElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const selectUser = () => {
    selectedElement.set('user');
    const userProfileElement = document.getElementById('user');
    if (userProfileElement) {
      userProfileElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      console.warn("Element with ID 'user' not found.");
    }
  };

  const selectProject = (index) => {
    selectedElement.set(`project-${index}`);
    const projectElement = document.getElementById(`project-${index}`);
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectContainer = (projectIndex, containerIndex) => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}`);
    const containerElement = document.getElementById(`project-${projectIndex}-container-${containerIndex}`);
    if (containerElement) {
      containerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectComponent = (projectIndex, containerIndex, componentIndex) => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
    const componentElement = document.getElementById(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
    if (componentElement) {
      componentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleAddContainer = (projectIndex) => {
    addContainer(projectIndex);
  };

  const handleAddComponent = (projectIndex, containerIndex) => {
    addComponent(projectIndex, containerIndex);
  };

  const handleAddProject = () => {
    addProject();
  };
</script>

<aside class="menu p-4 w-80 bg-gray-800 text-white h-full overflow-y-auto">
  <ul class="space-y-4">
    <li class="menu-title"><span class="text-2xl font-semibold">Menu</span></li>
    <li>
      <button
        on:click={selectPortfolio}
        class="text-xl block p-2 rounded cursor-pointer"
        class:bg-gray-700={$selectedElement === 'portfolio'}
      >
        Portfolio Settings
      </button>
    </li>
    <li>
      <button
        on:click={selectUser}
        class="block p-2 rounded text-center cursor-pointer"
        class:bg-gray-700={$selectedElement === 'user'}
      >
        User Profile
      </button>
    </li>
    {#each $projects as project, projectIndex (projectIndex)}
      <li class="menu-title mt-4">
        <div class="flex justify-between items-center">
          <span
            on:click={() => selectProject(projectIndex)}
            class="text-lg font-semibold cursor-pointer"
          >
            {project.title || 'Untitled Project'}
          </span>
          <div>
            {#if projectIndex > 0}
              <button
                class="btn btn-xs btn-outline mx-1"
                on:click={(e) => {
                  e.stopPropagation();
                  moveProjectUp(projectIndex);
                }}
              >
                ↑
              </button>
            {/if}
            {#if projectIndex < $projects.length - 1}
              <button
                class="btn btn-xs btn-outline mx-1"
                on:click={(e) => {
                  e.stopPropagation();
                  moveProjectDown(projectIndex);
                }}
              >
                ↓
              </button>
            {/if}
          </div>
        </div>
      </li>
      <ul class="ml-4 space-y-2">
        {#each project.containers as container, containerIndex (containerIndex)}
          <li class="menu-title mt-2">
            <div class="flex justify-between items-center">
              <span
                on:click={() => selectContainer(projectIndex, containerIndex)}
                class="text-md font-semibold cursor-pointer"
              >
                Container {containerIndex + 1} ({container.layout})
              </span>
              <div>
                {#if containerIndex > 0}
                  <button
                    class="btn btn-xs btn-outline mx-1"
                    on:click={(e) => {
                      e.stopPropagation();
                      moveContainerUp(projectIndex, containerIndex);
                    }}
                  >
                    ↑
                  </button>
                {/if}
                {#if containerIndex < project.containers.length - 1}
                  <button
                    class="btn btn-xs btn-outline mx-1"
                    on:click={(e) => {
                      e.stopPropagation();
                      moveContainerDown(projectIndex, containerIndex);
                    }}
                  >
                    ↓
                  </button>
                {/if}
              </div>
            </div>
          </li>
          <ul class="ml-4 space-y-1">
            {#each container.components as component, componentIndex (componentIndex)}
              <li class="flex justify-between items-center">
                <div class="flex justify-between items-center">
                  <a
                    on:click={() => selectComponent(projectIndex, containerIndex, componentIndex)}
                    class="cursor-pointer"
                    class:bg-gray-700={$selectedElement === `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`}
                  >
                    {component.title || 'Untitled Component'} ({component.type})
                  </a>
                  <div class="flex">
                    {#if componentIndex > 0}
                      <button
                        class="btn btn-xs btn-outline mx-1"
                        on:click={(e) => {
                          e.stopPropagation();
                          moveComponentUp(projectIndex, containerIndex, componentIndex);
                        }}
                      >
                        ↑
                      </button>
                    {/if}
                    {#if componentIndex < container.components.length - 1}
                      <button
                        class="btn btn-xs btn-outline mx-1"
                        on:click={(e) => {
                          e.stopPropagation();
                          moveComponentDown(projectIndex, containerIndex, componentIndex);
                        }}
                      >
                        ↓
                      </button>
                    {/if}
                  </div>
                </div>
              </li>
            {/each}
          </ul>
          <li class="mt-1">
            <button
              class="btn btn-outline btn-xs btn-tertiary w-full"
              on:click={() => handleAddComponent(projectIndex, containerIndex)}
            >
              + Add Component
            </button>
          </li>
        {/each}
        <li class="mt-2">
          <button
            class="btn btn-outline btn-sm btn-tertiary w-full"
            on:click={() => handleAddContainer(projectIndex)}
          >
            + Add Container
          </button>
        </li>
      </ul>
      <div class="divider"></div>
    {/each}
    <li class="mt-4">
      <button
        class="btn btn-outline btn-sm btn-secondary w-full"
        on:click={handleAddProject}
      >
        + Add Project
      </button>
    </li>
  </ul>
</aside>

<style>
  aside {
    height: 100%;
    overflow-y: auto;
  }
</style>
