<script>
  import { projects } from '../stores/projects.js';
  import { selectedElement } from '../stores/selectedElement.js';
  import { selectedElementStyles } from '../stores/selectedElementStyles.js';
  import { elementStyles } from '../stores/elementStyles.js';
  import { mode } from '../stores/mode.js';
  import { getStyleString } from '../utils/styleUtils.js';

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

  // Local copies of component properties
  let componentType = component.type;
  let componentTitle = component.title;
  let componentContent = component.content;

  // Watch for changes in component to update local variables
  $: if (componentType !== component.type) {
    componentType = component.type;
  }
  $: if (componentTitle !== component.title) {
    componentTitle = component.title;
  }
  $: if (componentContent !== component.content) {
    componentContent = component.content;
  }

  // Update functions
  function handleTypeChange(event) {
    updateComponent({ type: event.target.value });
  }

  function handleTitleChange(event) {
    updateComponent({ title: event.target.value });
  }

  function handleContentChange(event) {
    updateComponent({ content: event.target.value });
  }

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
    console.log('Selected Element:', `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateComponent({ content: e.target.result });
      };
      reader.readAsDataURL(file);
    }
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

  // Function to update the component in the projects store
  const updateComponent = (changes) => {
    projects.update((proj) => {
      const updatedProjects = proj.map((project, idx) => {
        if (idx === projectIndex) {
          const updatedContainers = project.containers.map((container, cIdx) => {
            if (cIdx === containerIndex) {
              const updatedComponents = container.components.map((comp, compIdx) => {
                if (compIdx === componentIndex) {
                  return {
                    ...comp,
                    ...changes,
                  };
                }
                return comp;
              });
              return {
                ...container,
                components: updatedComponents,
              };
            }
            return container;
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
  id={`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`}
  class="mt-4"
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={$mode === 'edit' && $selectedElement === `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`}
  style={getStyleString(
    $selectedElement === `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`
      ? $selectedElementStyles
      : $elementStyles[`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`]
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
        bind:value={componentType}
        on:change={handleTypeChange}
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="carousel">Carousel</option>
      </select>
    </div>

    <!-- Conditional Fields Based on Component Type -->
    {#if component.type === 'text'}
      <!-- Input fields for editing text component -->
      <input
        class="input input-bordered w-full max-w-xs mt-2"
        type="text"
        bind:value={componentTitle}
        on:input={handleTitleChange}
        placeholder="Component Title"
      />
      <textarea
        class="textarea textarea-bordered w-full max-w-xs mt-2"
        bind:value={componentContent}
        on:input={handleContentChange}
        placeholder="Component Content"
      ></textarea>
    {:else if component.type === 'image'}
      <!-- Image Upload -->
      <div class="form-control w-full max-w-xs mt-2">
        <label class="label">
          <span class="label-text">Upload Image</span>
          <span class="label-text-alt">Max size 1MB</span>
        </label>
        <input
          type="file"
          class="file-input file-input-bordered w-full max-w-xs"
          accept="image/*"
          on:change={handleImageUpload}
        />
        {#if component.content}
          <img src={component.content} alt="" class="mt-2 max-w-xs" />
        {/if}
      </div>
    {:else if component.type === 'carousel'}
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
            {#each component.images as image, idx}
              <div class="carousel-item">
                <img src={image} class="rounded-box" />
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  {:else}
    <!-- Display fields for component -->
    {#if component.type === 'text'}
      <h3 class="text-lg font-semibold">{component.title}</h3>
      <p>{component.content}</p>
    {:else if component.type === 'image'}
      {#if component.content}
        <img src={component.content} alt={component.title} class="max-w-full h-auto" />
      {/if}
    {:else if component.type === 'carousel'}
      {#if component.images}
        <div class="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 mt-4">
          {#each component.images as image, idx}
            <div class="carousel-item">
              <img src={image} class="rounded-box" />
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  {/if}
</div>

<style>
  .selected {
    border: 2px solid blue;
  }
</style>