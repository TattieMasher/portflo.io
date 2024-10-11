<script>
  import Component from './Component.svelte';
  import { selectedElement } from '../stores/selectedElement.js';
  import { selectedElementStyles } from '../stores/selectedElementStyles.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { mode } from '../stores/mode.js';
  import { getStyleString } from '../utils/styleUtils.js';

  export let project;
  export let index;

  const selectElement = () => {
    selectedElement.set(`project-${index}`);
    console.log('Selected Element:', `project-${index}`);
  };

  const layoutOptions = ['default', 'article', 'grid'];
</script>

<div
  id={`project-${index}`}
  class="card"
  on:click={$mode === 'edit' ? () => selectElement() : null}
  class:selected={$mode === 'edit' && $selectedElement === `project-${index}`}
  style={getStyleString(
    $selectedElement === `project-${index}`
      ? $selectedElementStyles
      : $elementStyles[`project-${index}`]
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
          <!-- Layout Selector -->
          <div class="form-control w-full mt-2">
            <label class="label">
              <span class="label-text">Project Layout</span>
            </label>
            <select class="select select-bordered w-full" bind:value={project.layout}>
              {#each layoutOptions as option}
                <option value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    {:else}
      <!-- Display fields for project -->
      <h2 class="card-title">{project.title}</h2>
      <p>{project.description}</p>
      <a href={project.project_url} target="_blank" class="text-blue-600 hover:underline">
        View Project
      </a>
    {/if}

    <!-- Render components based on layout -->
    {#if project.layout === 'article'}
      <!-- Article Layout -->
      <article>
        {#each project.components as component, componentIndex}
          <Component {component} {componentIndex} projectIndex={index} />
        {/each}
      </article>
    {:else if project.layout === 'grid'}
      <!-- Grid Layout -->
      <div class="grid grid-cols-2 gap-4">
        {#each project.components as component, componentIndex}
          <Component {component} {componentIndex} projectIndex={index} />
        {/each}
      </div>
    {:else}
      <!-- Default Layout -->
      {#each project.components as component, componentIndex}
        <Component {component} {componentIndex} projectIndex={index} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>