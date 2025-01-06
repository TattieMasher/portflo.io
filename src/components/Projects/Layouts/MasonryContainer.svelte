<script>
  import Component from '../Component.svelte';
  export let container;
  export let projectIndex;
  export let containerIndex;
</script>

<div class="masonry-grid">
  {#each container.components as component, componentIndex}
    <div class="masonry-item">
      <Component {component} {componentIndex} {projectIndex} {containerIndex} />
    </div>
  {/each}
</div>

<style>
  .masonry-grid {
    column-count: 3;
    column-gap: 1rem;
  }
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
</style>
