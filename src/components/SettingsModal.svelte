<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch('close');
  };
</script>

<div class="modal modal-open">
  <div class="modal-box">
    <h2 class="font-bold text-lg">Settings</h2>
    <!-- Add your settings content here -->
    <p>Settings content goes here.</p>
    <div class="modal-action">
      <button class="btn btn-secondary" on:click={closeModal}>Save</button>
      <button class="btn btn-error" on:click={closeModal}>Close</button>
    </div>
  </div>
</div>
