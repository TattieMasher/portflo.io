<script>
  import { mode } from '../stores/mode.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleSave = () => {
    dispatch('save');
  };
</script>

<div class="navbar bg-gray-800 text-white">
  <div class="flex-1">
    <a class="text-xl font-bold">My Portfolio</a>
  </div>
  <div class="flex-none space-x-2">
    <button
      class={`btn btn-outline ${$mode === 'edit' ? 'btn-info' : ''}`}
      on:click={() => mode.set('edit')}
    >
      Edit
    </button>
    <button
      class={`btn btn-outline ${$mode === 'preview' ? 'btn-info' : ''}`}
      on:click={() => mode.set('preview')}
    >
      Preview
    </button>
    <button class="btn btn-outline btn-accent" on:click={handleSave}>
      Save
    </button>
  </div>
</div>