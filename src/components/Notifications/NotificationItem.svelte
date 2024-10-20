<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let notification;
  export let removeNotification;

  onMount(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  });
</script>

<div
  class="notification {notification.type}"
  transition:fade={{ duration: 300 }}
>
  <span>{notification.message}</span>
  <button on:click={() => removeNotification(notification.id)}>✖</button>
</div>

<style>
  .notification {
    background: #323232;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .notification.info {
    background: #2196f3;
  }
  .notification.success {
    background: #4caf50;
  }
  .notification.error {
    background: #f44336;
  }
  .notification button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.2rem;
  }
</style>