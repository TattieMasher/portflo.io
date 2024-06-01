<script>
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  export let projects;
  export let isEditMode = false;
  export let selectedElement;

  // Subscribe to the projects store and keep a local copy for reactivity
  let localProjects = get(projects);
  const unsubscribe = projects.subscribe(value => {
    localProjects = value;
  });

  onDestroy(unsubscribe);

  const updateProjectTitle = (index, title) => {
    projects.update(proj => {
      proj[index].title = title;
      return proj;
    });
  };

  const updateProjectDescription = (index, description) => {
    projects.update(proj => {
      proj[index].description = description;
      return proj;
    });
  };

  const updateComponentTitle = (projectIndex, componentIndex, title) => {
    projects.update(proj => {
      proj[projectIndex].components[componentIndex].title = title;
      return proj;
    });
  };

  const updateComponentContent = (projectIndex, componentIndex, content) => {
    projects.update(proj => {
      proj[projectIndex].components[componentIndex].content = content;
      return proj;
    });
  };
</script>

<div class="grid grid-cols-1 gap-4">
  {#each localProjects as project, index}
    <div class={`card bg-base-100 shadow-xl ${selectedElement === `project-${index}` ? 'border border-blue-500' : ''}`}>
      <div class="card-body">
        {#if isEditMode}
          <input class="input input-bordered w-full max-w-xs" type="text" value={project.title} placeholder="Project Title" on:input={(e) => updateProjectTitle(index, e.target.value)} />
          <textarea class="textarea textarea-bordered w-full max-w-xs mt-2" value={project.description} placeholder="Project Description" on:input={(e) => updateProjectDescription(index, e.target.value)}></textarea>
        {:else}
          <h2 class="card-title">{project.title || 'Untitled Project'}</h2>
          <p>{project.description}</p>
        {/if}
        <a href={project.project_url} target="_blank" class="text-blue-600 hover:underline">View Project</a>
        {#each project.components as component, componentIndex}
          <div class="mt-4">
            {#if component.type === 'text'}
              {#if isEditMode}
                <input class="input input-bordered w-full max-w-xs" type="text" value={component.title} placeholder="Component Title" on:input={(e) => updateComponentTitle(index, componentIndex, e.target.value)} />
                <textarea class="textarea textarea-bordered w-full" value={component.content} placeholder="Component Content" on:input={(e) => updateComponentContent(index, componentIndex, e.target.value)}></textarea>
              {:else}
                <h3 class="text-lg font-bold">{component.title || 'Untitled Component'}</h3>
                <p class={component.style}>{component.content}</p>
              {/if}
            {:else if component.type === 'image'}
              <img src={component.content} class={component.style} />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>