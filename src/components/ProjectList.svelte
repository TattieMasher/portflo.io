<script>
  export let projects;
  export let isEditMode = false;
  export let selectedElement;
</script>

<div class="grid grid-cols-1 gap-4">
  {#each $projects as project, index}
    <div id={`project-${index}`} class={`card bg-base-100 shadow-xl ${selectedElement === `project-${index}` ? 'border border-blue-500' : ''}`}>
      <div class="card-body">
        {#if isEditMode}
          <input class="input input-bordered w-full max-w-xs" type="text" bind:value={project.title} placeholder="Project Title" />
          <input class="input input-bordered w-full max-w-xs" type="text" bind:value={project.url} placeholder="Project URL" /> <!-- TODO -->
          <textarea class="textarea textarea-bordered w-full max-w-xs mt-2" bind:value={project.description} placeholder="Project Description"></textarea>
        {:else}
          <h2 class="card-title">{project.title}</h2>
          <p>{project.description}</p>
        {/if}
        <a href={project.project_url} target="_blank" class="text-blue-600 hover:underline">View Project</a>

        {#each project.components as component, componentIndex}
          <div id={`project-${index}-component-${componentIndex}`} class={`mt-4 ${selectedElement === `project-${index}-component-${componentIndex}` ? 'border border-blue-500' : ''}`}>
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