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
  <div class="flex-none">
    <button class="btn" on:click={() => setMode('edit')} class:active={$mode === 'edit'}>
      Edit
    </button>
    <button class="btn" on:click={() => setMode('preview')} class:active={$mode === 'preview'}>
      Preview
    </button>
  </div>
</div>
