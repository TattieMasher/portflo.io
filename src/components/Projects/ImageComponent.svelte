<script>
  import { projects } from '../../stores/projects.js';
  import { mode } from '../../stores/mode.js';

  export let component;
  export let componentIndex;
  export let projectIndex;
  export let containerIndex;

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
{:else}
  <!-- Display fields for component -->
  {#if component.content}
    <img src={component.content} alt={component.title} class="max-w-full h-auto" />
  {/if}
{/if}
