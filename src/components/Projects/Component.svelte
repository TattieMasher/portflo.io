<script>
  import DropdownSelect from '../Controls/Modules/DropdownSelect.svelte';
  import ToggleSwitch from '../Controls/Modules/ToggleSwitch.svelte';
  import TextComponent from './TextComponent.svelte';
  import ImageComponent from './ImageComponent.svelte';
  import CarouselComponent from './CarouselComponent.svelte';
  import VideoComponent from './VideoComponent.svelte';
  import { selectedElement } from '../../stores/selectedElement.js';
  import { mode } from '../../stores/mode.js';
  import { updateComponent } from '../../utils/updateComponent.js';

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

  const selectElement = () => {
    selectedElement.set(`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`);
  };

  const componentTypes = [
    { label: 'Text', value: 'text', icon: 'radix-icons:font-family' },
    { label: 'Image', value: 'image', icon: 'radix-icons:image' },
    { label: 'Carousel', value: 'carousel', icon: 'radix-icons:slider' },
    { label: 'Video', value: 'video', icon: 'radix-icons:video' },
  ];

  const updateComponentType = (type) => {
    updateComponent(projectIndex, containerIndex, componentIndex, { type });
  };

  const toggleTitleVisibility = () => {
    updateComponent(projectIndex, containerIndex, componentIndex, {
      showTitle: !component.showTitle,
    });
  };

  const updateTitle = (event) => {
    updateComponent(projectIndex, containerIndex, componentIndex, {
      title: event.target.value,
    });
  };
</script>

<div
  id={`project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`}
  class="component-wrapper"
  on:click={(e) => {
    if ($mode === 'edit') {
      e.stopPropagation();
      selectElement();
    }
  }}
  class:selected={$mode === 'edit' && $selectedElement === `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`}
>
  <div class="component-content-wrapper">
    {#if $mode === 'edit'}
      <DropdownSelect
        label="Component Type"
        options={componentTypes}
        value={component.type}
        onChange={updateComponentType}
      />
      <ToggleSwitch
        label="Show Title"
        checked={component.showTitle}
        onChange={toggleTitleVisibility}
      />
      {#if component.showTitle}
        <input
          type="text"
          class="input input-bordered w-full max-w-96 mt-2"
          bind:value={component.title}
          on:input={updateTitle}
          placeholder="Component Title"
        />
      {/if}
    {/if}

    <!-- Render the appropriate component based on type -->
      <div class="component-body">
        {#if component.showTitle && $mode !== 'edit'}
        <h3 class="text-lg font-semibold">{component.title || 'Untitled Component'}</h3>
      {/if}    
      {#if component.type === 'text'}
        <TextComponent {component} {componentIndex} {projectIndex} {containerIndex} />
      {:else if component.type === 'image'}
        <ImageComponent {component} {componentIndex} {projectIndex} {containerIndex} />
      {:else if component.type === 'carousel'}
        <CarouselComponent {component} {componentIndex} {projectIndex} {containerIndex} />
      {:else if component.type === 'video'}
        <VideoComponent {component} {componentIndex} {projectIndex} {containerIndex} />
      {/if}
    </div>
  </div>
</div>

<style>
  .component-wrapper {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 4px;
    transition: outline 0.2s ease;
  }

  .component-wrapper.selected {
    outline: 2px dashed blue;
    outline-offset: -6px;
  }

  .component-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
