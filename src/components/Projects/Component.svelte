<script>
  import TextComponent from './TextComponent.svelte';
  import ImageComponent from './ImageComponent.svelte';
  import CarouselComponent from './CarouselComponent.svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { mode } from '../../stores/mode.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { projects } from '../../stores/projects.js';

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
    console.log('Selected Element:', `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
  };

  const handleTypeChange = (event) => {
    updateComponent({ type: event.target.value });
  };

  const updateComponent = (changes) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((projItem, idx) => {
        if (idx === projectIndex) {
          const updatedContainers = projItem.containers.map((containerItem, cIdx) => {
            if (cIdx === containerIndex) {
              const updatedComponents = containerItem.components.map((comp, compIdx) => {
                if (compIdx === componentIndex) {
                  return { ...comp, ...changes };
                }
                return comp;
              });
              return { ...containerItem, components: updatedComponents };
            }
            return containerItem;
          });
          return { ...projItem, containers: updatedContainers };
        }
        return projItem;
      });
      return updatedProjects;
    });
  };
</script>

<div
  id={`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`}
  class="mt-4"
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={
    $mode === 'edit' &&
    $selectedElement ===
      `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`
  }
  style={getStyleString(
    $selectedElement ===
      `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`
      ? $selectedElementStyles
      : $elementStyles[
          `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`
        ] || {}
  )}
>
  {#if $mode === 'edit'}
    <!-- Component Type Selector -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Component Type</span>
      </label>
      <select
        class="select select-bordered"
        bind:value={component.type}
        on:change={handleTypeChange}
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="carousel">Carousel</option>
      </select>
    </div>
  {/if}

  <!-- Render the appropriate component based on type -->
  {#if component.type === 'text'}
    <TextComponent
      {component}
      {componentIndex}
      {projectIndex}
      {containerIndex}
    />
  {:else if component.type === 'image'}
    <ImageComponent
      {component}
      {componentIndex}
      {projectIndex}
      {containerIndex}
    />
  {:else if component.type === 'carousel'}
    <CarouselComponent
      {component}
      {componentIndex}
      {projectIndex}
      {containerIndex}
    />
  {/if}
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>
