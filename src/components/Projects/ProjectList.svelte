<script>
  import Project from './Project.svelte';
  import { projects } from '../../stores/projects.js';
</script>

<div class="grid grid-cols-1 gap-4">
  {#each $projects as project, index}
    <Project {project} projectIndex={index} />
  {/each}
</div>