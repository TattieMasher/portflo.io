<script>
  import TextComponent from './TextComponent.svelte';
  import ImageComponent from './ImageComponent.svelte';
  import CarouselComponent from './CarouselComponent.svelte';
  import VideoComponent from './VideoComponent.svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { selectedElementStyles } from '../../stores/selectedElementStyles.js';
  import { elementStyles } from '../../stores/elementStyles.js';
  import { mode } from '../../stores/mode.js';
  import { getStyleString } from '../../utils/styleUtils.js';
  import { updateComponent } from '../../utils/updateComponent.js'; // Import centralized function

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
    console.log('Selected Element:', `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
  };

  const handleTypeChange = (event) => {
    updateComponent(projectIndex, containerIndex, componentIndex, { type: event.target.value });
  };

  const componentTypes = ['text', 'image', 'carousel', 'video'];
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
    <div class="form-control w-full max-w-96">
      <label class="label">
        <span class="label-text">Component Type</span>
      </label>
      <select
        class="select select-bordered"
        bind:value={component.type}
        on:change={handleTypeChange}
      >
        {#each componentTypes as type}
          <option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
        {/each}
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
  {:else if component.type === 'video'}
    <VideoComponent
      {component}
      {componentIndex}
      {projectIndex}
      {containerIndex}
    />
  {/if}
</div>

<style>
  .selected {
    outline: 2px solid blue;
    outline-offset: 4px;
    outline-style: dashed;
  }
</style>
