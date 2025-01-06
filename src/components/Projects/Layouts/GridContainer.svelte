<script>
  import Component from '../Component.svelte';
  export let container;
  export let projectIndex;
  export let containerIndex;
</script>

<div class="grid" style="grid-template-columns: repeat({container.numColumns || 2}, 1fr); gap: {container.gapSize || '1rem'};">
  {#each container.components as component, componentIndex}
    <Component {component} {componentIndex} {projectIndex} {containerIndex} />
  {/each}
</div>
