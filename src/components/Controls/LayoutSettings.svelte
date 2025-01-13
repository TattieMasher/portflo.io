<script>
  import { rootStore } from '../../stores/rootStore';
  import { get } from 'svelte/store';
  import { updateContainerProperty } from '../../utils/updateContainerProperty.js';

  import ArticleSettings from './LayoutSettings/ArticleSettings.svelte';
  import GridSettings from './LayoutSettings/GridSettings.svelte';
  import CarouselSettings from './LayoutSettings/CarouselSettings.svelte';
  import TimelineSettings from './LayoutSettings/TimelineSettings.svelte';
  import MasonrySettings from './LayoutSettings/MasonrySettings.svelte';

  const { selectedElement, projects } = rootStore;

  let containerLayout = null;
  let previousSelectedElement = null;

  // Recalculate container layout when selected element changes
  $: if ($selectedElement !== previousSelectedElement) {
    previousSelectedElement = $selectedElement;
    initializeLayoutType();
  }

  function initializeLayoutType() {
    const [projectIndex, containerIndex] = getIndicesFromElementId($selectedElement);
    if (projectIndex !== null && containerIndex !== null) {
      const currentProjects = get(projects);
      const container = currentProjects[projectIndex]?.containers?.[containerIndex];
      containerLayout = container?.layout || null;
    } else {
      containerLayout = null;
    }
  }

  function getIndicesFromElementId(elementId) {
    if (elementId?.startsWith('project-')) {
      const parts = elementId.split('-');
      const projectIndex = parseInt(parts[1]);
      if (parts[2] === 'container') {
        const containerIndex = parseInt(parts[3]);
        return [projectIndex, containerIndex];
      }
    }
    return [null, null];
  }
</script>

<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" id="layout-settings" />
  <label for="layout-settings" class="collapse-title text-xl font-medium">
    Layout Settings
  </label>
  <div class="collapse-content">
    {#if containerLayout === 'grid'}
      <GridSettings />
    {:else if containerLayout === 'article'}
      <ArticleSettings />
    {:else if containerLayout === 'carousel'}
      <CarouselSettings />
    {:else if containerLayout === 'timeline'}
      <TimelineSettings />
    {:else if containerLayout === 'masonry'}
      <MasonrySettings />
    {:else}
      <p>No layout-specific settings available.</p>
    {/if}
  </div>
</div>
