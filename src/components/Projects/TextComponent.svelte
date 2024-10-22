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

  const handleTitleChange = (event) => {
    updateComponent({ title: event.target.value });
  };

  const handleContentChange = (event) => {
    updateComponent({ content: event.target.value });
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
    <!-- Input fields for editing text component -->
    <input
      class="input input-bordered w-full max-w-xs mt-2"
      type="text"
      bind:value={component.title}
      on:input={handleTitleChange}
      placeholder="Component Title"
    />
    <textarea
      class="textarea textarea-bordered w-full max-w-xs mt-2"
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