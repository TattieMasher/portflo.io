<script>
  import { updateComponent } from '../../utils/updateComponent.js';
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

  const handleTitleChange = (event) => { 
    updateComponent({ title: event.target.value });
  };

  const handleContentChange = (event) => {
    updateComponent({ content: event.target.value });
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
    <!-- Input fields for editing text component -->
    <input
      class="input input-bordered w-full max-w-96 mt-2"
      type="text"
      bind:value={component.title}
      on:input={handleTitleChange}
      placeholder="Component Title"
    />
    <textarea
      class="textarea textarea-bordered w-full max-w-96 mt-2"
      bind:value={component.content}
      on:input={handleContentChange}
      placeholder="Component Content"
    ></textarea>
  {:else}
    <!-- Display fields for component -->
    <h3 class="text-lg font-semibold">{component.title}</h3>
    <p>{component.content}</p>
  {/if}
</div>