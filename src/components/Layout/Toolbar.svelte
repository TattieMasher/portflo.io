<script>
  import { mode } from '../../stores/mode.js';
  import { createEventDispatcher } from 'svelte';
  import Icon from '@iconify/svelte';
  import SettingsModal from '../Settings/SettingsModal.svelte';

  const dispatch = createEventDispatcher();

  const handleSave = () => {
    dispatch('save');
  };

  let showSettingsModal = false;

  const openSettingsModal = () => {
    showSettingsModal = true;
  };

  const closeSettingsModal = () => {
    showSettingsModal = false;
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
    <!-- Settings Icon -->
    <button class="btn btn-outline btn-secondary" on:click={openSettingsModal}>
      <Icon icon="mdi-light:settings" class="text-xl" />
    </button>
  </div>
</div>

<!-- Settings Modal -->
{#if showSettingsModal}
  <SettingsModal on:close={closeSettingsModal} />
{/if}