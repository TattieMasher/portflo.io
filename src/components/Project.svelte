<script>
  import Container from './Container.svelte';
  import { selectedElement } from '../stores/selectedElement.js';
  import { selectedElementStyles } from '../stores/selectedElementStyles.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { mode } from '../stores/mode.js';
  import { getStyleString } from '../utils/styleUtils.js';

  export let project;
  export let projectIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}`);
    console.log('Selected Element:', `project-${projectIndex}`);
  };
</script>

<div
  id={`project-${projectIndex}`}
  class="card"
  on:click={$mode === 'edit' ? () => selectElement() : null}
  class:selected={$mode === 'edit' && $selectedElement === `project-${projectIndex}`}
  style={getStyleString(
    $selectedElement === `project-${projectIndex}`
      ? $selectedElementStyles
      : $elementStyles[`project-${projectIndex}`]
  )}
>
  <div class="card-body">
    {#if $mode === 'edit'}
      <!-- Input fields for editing project -->
      <div class="flex flex-wrap -mx-2">
        <!-- Left Column -->
        <div class="w-full md:w-1/2 px-2">
          <label class="label">
            <span class="label-text">Project Title</span>
          </label>
          <input
            class="input input-bordered w-full"
            type="text"
            bind:value={project.title}
            placeholder="Project Title"
          />
          <label class="label">
            <span class="label-text">Project Description</span>
          </label>
          <textarea
            class="textarea textarea-bordered w-full mt-2"
            bind:value={project.description}
            placeholder="Project Description"
          ></textarea>
        </div>
        <!-- Right Column -->
        <div class="w-full md:w-1/2 px-2">
          <label class="label">
            <span class="label-text">Project URL (if applicable)</span>
          </label>
          <input
            class="input input-bordered w-full"
            type="text"
            bind:value={project.project_url}
            placeholder="Project URL"
          />
        </div>
      </div>
    {:else}
      <!-- Display fields for project -->
      <h2 class="card-title">{project.title}</h2>
      <p>{project.description}</p>
      {#if project.project_url}
        <a href={project.project_url} target="_blank" class="text-blue-600 hover:underline">
          View Project
        </a>
      {/if}
    {/if}

    <!-- Render containers within the project -->
    {#each project.containers as container, containerIndex}
      <Container {container} {containerIndex} {projectIndex} />
    {/each}
  </div>
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>