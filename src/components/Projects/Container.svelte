<script>
  import Component from '../Projects/Component.svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { mode } from '../../stores/mode.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { projects } from '../../stores/projects.js';

  export let container;
  export let containerIndex;
  export let projectIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}`);
    console.log('Selected Element:', `project-${projectIndex}-container-${containerIndex}`);
  };

  // Available layout options for containers
  const layoutOptions = ['article', 'grid', 'carousel', 'timeline', 'masonry'];

  const updateContainerLayout = (event) => {
    const newLayout = event.target.value;
    projects.update((proj) => {
      const updatedProjects = proj.map((project, idx) => {
        if (idx === projectIndex) {
          const updatedContainers = project.containers.map((containerItem, cIdx) => {
            if (cIdx === containerIndex) {
              return {
                ...containerItem,
                layout: newLayout,
              };
            }
            return containerItem;
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
</script>

<div
  id={`project-${projectIndex}-container-${containerIndex}`}
  class="mt-4"
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={
    $mode === 'edit' &&
    $selectedElement === `project-${projectIndex}-container-${containerIndex}`
  }
  style={getStyleString(
    $selectedElement === `project-${projectIndex}-container-${containerIndex}`
      ? $selectedElementStyles
      : $elementStyles[`project-${projectIndex}-container-${containerIndex}`] || {}
  )}
>
  {#if $mode === 'edit'}
    <!-- Layout Selector -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Container Layout</span>
      </label>
      <select
        class="select select-bordered"
        bind:value={container.layout}
        on:change={updateContainerLayout}
      >
        {#each layoutOptions as option}
          <option value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
        {/each}
      </select>
    </div>
  {/if}

  <!-- Render components based on container layout -->
  {#if container.layout === 'article'}
    <!-- Article Layout -->
    <article class={container.centeredComponents ? 'text-center' : ''}>
      {#each container.components as component, componentIndex}
        <Component {component} {componentIndex} {projectIndex} {containerIndex} />
      {/each}
    </article>
  {:else if container.layout === 'grid'}
    <!-- Grid Layout -->
    <div class="grid" style="grid-template-columns: repeat({container.numColumns || 2}, 1fr); gap: {container.gapSize || '1rem'};">
      {#each container.components as component, componentIndex}
        <Component {component} {componentIndex} {projectIndex} {containerIndex} />
      {/each}
    </div>
  {:else if container.layout === 'carousel'}
    <!-- Carousel Layout -->
    <div class="carousel carousel-center bg-neutral rounded-box max-w-full space-x-4 p-4">
      {#each container.components as component, componentIndex}
        <div class="carousel-item">
          <Component {component} {componentIndex} {projectIndex} {containerIndex} />
        </div>
      {/each}
    </div>
  {:else if container.layout === 'timeline'}
    <!-- Timeline Layout -->
    <div class="relative">
      {#each container.components as component, componentIndex}
        <div class="mb-8 flex items-center">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            {componentIndex + 1}
          </div>
          <div class="ml-4">
            <Component {component} {componentIndex} {projectIndex} {containerIndex} />
          </div>
        </div>
      {/each}
    </div>
  {:else if container.layout === 'masonry'}
    <!-- Masonry Layout -->
    <div class="masonry-grid">
      {#each container.components as component, componentIndex}
        <div class="masonry-item">
          <Component {component} {componentIndex} {projectIndex} {containerIndex} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .selected {
    border: 2px solid blue !important; /* Maybe use outline instead? */
  }
  .masonry-grid {
    column-count: 3;
    column-gap: 1rem;
  }
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
</style>