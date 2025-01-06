<script>
  import Component from '../Component.svelte';
  export let container;
  export let projectIndex;
  export let containerIndex;
</script>

<div class="relative">
  {#each container.components as component, componentIndex}
    <div class="mb-8 flex items-center">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
        {componentIndex + 1}
      </div>
      <div class="ml-4">
        <Component {component} {componentIndex} {projectIndex} {containerIndex} />
      </div>
    </div>
  {/each}
</div>
