<script>
  import { writable } from 'svelte/store';

  export let mode;
  const setMode = (newMode) => {
    mode.set(newMode);
  }
</script>

<div class="navbar bg-gray-800 text-white">
  <div class="flex-1">
    <a class="text-xl font-bold">My Portfolio</a>
  </div>
  <div class="flex-none space-x-2">
    <button class={`btn btn-outline ${$mode === 'edit' ? 'btn-info' : ''}`} on:click={() => setMode('edit')}>
      Edit
    </button>
    <button class={`btn btn-outline ${$mode === 'preview' ? 'btn-info' : ''}`} on:click={() => setMode('preview')}>
      Preview
    </button>
    <button class="btn btn-outline btn-accent">
      Save
    </button>
  </div>
</div>