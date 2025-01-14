<script>
  import DropdownSelect from '../Controls/Modules/DropdownSelect.svelte';
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
  };

  const layoutOptions = [
    { label: 'Article', value: 'article', icon: 'radix-icons:align-top' },
    { label: 'Grid', value: 'grid', icon: 'radix-icons:grid' },
    { label: 'Carousel', value: 'carousel', icon: 'radix-icons:slider' },
    { label: 'Timeline', value: 'timeline', icon: 'radix-icons:activity-log' },
    { label: 'Masonry', value: 'masonry', icon: 'radix-icons:dashboard' },
  ];

  const updateContainerLayout = (layout) => {
    projects.update((proj) =>
      proj.map((project, idx) => {
        if (idx === projectIndex) {
          const updatedContainers = project.containers.map((c, cIdx) =>
            cIdx === containerIndex ? { ...c, layout } : c
          );
          return { ...project, containers: updatedContainers };
        }
        return project;
      })
    );
  };
</script>

<div
  id={`project-${projectIndex}-container-${containerIndex}`}
  class="mt-4 container-header"
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={$mode === 'edit' && $selectedElement === `project-${projectIndex}-container-${containerIndex}`}
  style={getStyleString(
    $selectedElement === `project-${projectIndex}-container-${containerIndex}`
      ? $selectedElementStyles
      : $elementStyles[`project-${projectIndex}-container-${containerIndex}`] || {}
  )}
>
  {#if $mode === 'edit'}
    <DropdownSelect
      label="Container Layout"
      options={layoutOptions}
      value={container.layout}
      onChange={updateContainerLayout}
    />
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


<style>
  .container-header {
    margin-bottom: 4px;
  }
</style>