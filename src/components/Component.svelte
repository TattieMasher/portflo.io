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

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-component-${componentIndex}`);
    console.log('Selected Element:', `project-${projectIndex}-component-${componentIndex}`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        projects.update((proj) => {
          const updatedProjects = proj.map((project, idx) => {
            if (idx === projectIndex) {
              const updatedComponents = project.components.map((comp, cIdx) => {
                if (cIdx === componentIndex) {
                  return {
                    ...comp,
                    content: e.target.result,
                  };
                }
                return comp;
              });
              return {
                ...project,
                components: updatedComponents,
              };
            }
            return project;
          });
          return updatedProjects;
        });
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
        projects.update((proj) => {
          const updatedProjects = proj.map((project, idx) => {
            if (idx === projectIndex) {
              const updatedComponents = project.components.map((comp, cIdx) => {
                if (cIdx === componentIndex) {
                  return {
                    ...comp,
                    images: images,
                  };
                }
                return comp;
              });
              return {
                ...project,
                components: updatedComponents,
              };
            }
            return project;
          });
          return updatedProjects;
        });
      });
    }
  };
</script>

<div
  id={`project-${projectIndex}-component-${componentIndex}`}
  class="mt-4"
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={$mode === 'edit' && $selectedElement === `project-${projectIndex}-component-${componentIndex}`}
  style={getStyleString(
    $selectedElement === `project-${projectIndex}-component-${componentIndex}`
      ? $selectedElementStyles
      : $elementStyles[`project-${projectIndex}-component-${componentIndex}`]
  )}
>
  {#if $mode === 'edit'}
    <!-- Component Type Selector -->
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Component Type</span>
      </label>
      <select class="select select-bordered" bind:value={component.type}>
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
        bind:value={component.title}
        placeholder="Component Title"
      />
      <textarea
        class="textarea textarea-bordered w-full max-w-xs mt-2"
        bind:value={component.content}
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
          <img src={component.content} alt="Uploaded Image" class="mt-2 max-w-xs" />
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