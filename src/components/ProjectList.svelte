<script>
  export let projects;
  export let isEditMode = false;
  export let selectedElement;

  const highlightElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 2000); // Highlight duration: 2 seconds
    }
  };

  $: if (selectedElement) {
    highlightElement(selectedElement);
  }
</script>

<div class="grid grid-cols-1 gap-4">
  {#each $projects as project, index}
    <div id={`project-${index}`} class={`card bg-base-100 shadow-xl`}>
      <div class="card-body">
        {#if isEditMode}
          <input class="input input-bordered w-full max-w-xs" type="text" bind:value={project.title} placeholder="Project Title" />
          <input class="input input-bordered w-full max-w-xs" type="text" bind:value={project.url} placeholder="Project URL" />
          <textarea class="textarea textarea-bordered w-full max-w-xs mt-2" bind:value={project.description} placeholder="Project Description"></textarea>
        {:else}
          <h2 class="card-title">{project.title}</h2>
          <p>{project.description}</p>
          <a href={project.project_url} target="_blank" class="text-blue-600 hover:underline">View Project</a>
        {/if}

        {#each project.components as component, componentIndex}
          <div id={`project-${index}-component-${componentIndex}`} class="mt-4">
            {#if isEditMode}
              <input class="input input-bordered w-full max-w-xs" type="text" bind:value={component.title} placeholder="Component Title" />
              <textarea class="textarea textarea-bordered w-full max-w-xs mt-2" bind:value={component.content} placeholder="Component Content"></textarea>
            {:else}
              <h3 class="text-lg font-semibold">{component.title}</h3>
              <p>{component.content}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .highlight {
    border: 2px solid blue;
    animation: highlight-fade 2s forwards;
  }

  @keyframes highlight-fade {
    from {
      border: 2px solid blue;
    }
    to {
      border: 2px solid transparent;
    }
  }
</style>