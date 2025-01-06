<script>
  import Component from '../Component.svelte';
  export let container;
  export let projectIndex;
  export let containerIndex;
</script>

<article class={container.centeredComponents ? 'text-center' : ''}>
  {#each container.components as component, componentIndex}
    <Component {component} {componentIndex} {projectIndex} {containerIndex} />
  {/each}
</article>
