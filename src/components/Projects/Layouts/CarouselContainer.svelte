<script>
  import Component from '../Component.svelte';
  export let container;
  export let projectIndex;
  export let containerIndex;
</script>

<div class="carousel carousel-center bg-neutral rounded-box max-w-full space-x-4 p-4">
  {#each container.components as component, componentIndex}
    <div class="carousel-item">
      <Component {component} {componentIndex} {projectIndex} {containerIndex} />
    </div>
  {/each}
</div>
