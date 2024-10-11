<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch('close');
  };
</script>

<div class="modal modal-open">
  <div class="modal-box">
    <h2 class="font-bold text-lg">Editor Settings</h2>
    <p>Settings content goes here, probs in the form of other components (TODO?)</p>
    <div class="modal-action">
      <button class="btn btn-secondary" on:click={closeModal}>Save</button>
      <button class="btn btn-error" on:click={closeModal}>Close</button>
    </div>
  </div>
</div>
