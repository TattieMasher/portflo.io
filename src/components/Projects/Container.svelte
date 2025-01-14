<script>
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { mode } from '../../stores/mode.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { projects } from '../../stores/projects.js';

  import ArticleContainer from './Layouts/ArticleContainer.svelte';
  import GridContainer from './Layouts/GridContainer.svelte';
  import CarouselContainer from './Layouts/CarouselContainer.svelte';
  import TimelineContainer from './Layouts/TimelineContainer.svelte';
  import MasonryContainer from './Layouts/MasonryContainer.svelte';

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
    <ArticleContainer {container} {projectIndex} {containerIndex} />
  {:else if container.layout === 'grid'}
    <GridContainer {container} {projectIndex} {containerIndex} />
  {:else if container.layout === 'carousel'}
    <CarouselContainer {container} {projectIndex} {containerIndex} />
  {:else if container.layout === 'timeline'}
    <TimelineContainer {container} {projectIndex} {containerIndex} />
  {:else if container.layout === 'masonry'}
    <MasonryContainer {container} {projectIndex} {containerIndex} />
  {/if}
</div>