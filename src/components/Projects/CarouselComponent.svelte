<script>
  import { projects } from '../../stores/projects.js';
  import { mode } from '../../stores/mode.js';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { getStyleString } from '../../utils/styleUtils.js';

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
  };

  const handleCarouselImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      Promise.all(
        files.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        })
      ).then((images) => {
        updateComponent({ images });
      });
    }
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
    <!-- Carousel Image Upload -->
    <div class="form-control w-full max-w-xs mt-2">
      <label class="label">
        <span class="label-text">Upload Images for Carousel</span>
      </label>
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/*"
        multiple
        on:change={handleCarouselImageUpload}
      />
      {#if component.images}
        <div class="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 mt-4">
          {#each component.images as image}
            <div class="carousel-item">
              <img src={image} class="rounded-box" />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <!-- Display fields for component -->
    {#if component.images}
      <div class="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 mt-4">
        {#each component.images as image}
          <div class="carousel-item">
            <img src={image} class="rounded-box" />
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>