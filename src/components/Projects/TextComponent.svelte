<script>
  import { projects } from '../../stores/projects.js';
  import { mode } from '../../stores/mode.js';

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

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
