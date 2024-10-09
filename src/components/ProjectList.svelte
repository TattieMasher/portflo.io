<script>
  import { projects } from '../stores/projects.js';
  import { selectedElement } from '../stores/selectedElement.js';
  import { selectedElementStyles } from '../stores/selectedElementStyles.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { mode } from '../stores/mode.js';
  import { getStyleString } from '../utils/styleUtils.js';

  const selectElement = (element) => {
    selectedElement.set(element);
    console.log('Selected Element:', element);
  };
</script>

<div class="grid grid-cols-1 gap-4">
  {#each $projects as project, index}
    {#key $elementStyles[`project-${index}`]}
    <div
      id={`project-${index}`}
      class="card"
      on:click={$mode === 'edit' ? () => selectElement(`project-${index}`) : null}
      class:selected={$mode === 'edit' && $selectedElement === `project-${index}`}
      style={getStyleString($elementStyles[`project-${index}`])}
    >
      <div class="card-body">
        {#if $mode === 'edit'}
          <!-- Input fields for editing project -->
          <input
            class="input input-bordered w-full max-w-xs"
            type="text"
            bind:value={project.title}
            placeholder="Project Title"
          />
          <input
            class="input input-bordered w-full max-w-xs"
            type="text"
            bind:value={project.project_url}
            placeholder="Project URL"
          />
          <textarea
            class="textarea textarea-bordered w-full max-w-xs mt-2"
            bind:value={project.description}
            placeholder="Project Description"
          ></textarea>
        {:else}
          <!-- Display fields for project -->
          <h2
            class="card-title"
            style={getStyleString($elementStyles[`project-${index}`])}
          >
            {project.title}
          </h2>
          <p style={getStyleString($elementStyles[`project-${index}`])}>
            {project.description}
          </p>
          <a
            href={project.project_url}
            target="_blank"
            class="text-blue-600 hover:underline"
            style={getStyleString($elementStyles[`project-${index}`])}
          >
            View Project
          </a>
        {/if}

        {#each project.components as component, componentIndex}
          {#key $elementStyles[`project-${index}-component-${componentIndex}`]}
          <div
            id={`project-${index}-component-${componentIndex}`}
            class="mt-4"
            on:click={(e) => {
              if ($mode === 'edit') {
                e.stopPropagation();
                selectElement(`project-${index}-component-${componentIndex}`);
              }
            }}
            class:selected={
              $mode === 'edit' &&
              $selectedElement === `project-${index}-component-${componentIndex}`
            }
            style={getStyleString({
              ...$elementStyles[`project-${index}`],
              ...$elementStyles[`project-${index}-component-${componentIndex}`],
            })}
          >
            {#if $mode === 'edit'}
              <!-- Input fields for editing component -->
              <input
                class="input input-bordered w-full max-w-xs"
                type="text"
                bind:value={component.title}
                placeholder="Component Title"
              />
              <textarea
                class="textarea textarea-bordered w-full max-w-xs mt-2"
                bind:value={component.content}
                placeholder="Component Content"
              ></textarea>
            {:else}
              <!-- Display fields for component -->
              <h3
                class="text-lg font-semibold"
                style={getStyleString({
                  ...$elementStyles[`project-${index}`],
                  ...$elementStyles[`project-${index}-component-${componentIndex}`],
                })}
              >
                {component.title}
              </h3>
              <p
                style={getStyleString({
                  ...$elementStyles[`project-${index}`],
                  ...$elementStyles[`project-${index}-component-${componentIndex}`],
                })}
              >
                {component.content}
              </p>
            {/if}
          </div>
          {/key}
        {/each}
      </div>
    </div>
    {/key}
  {/each}
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>