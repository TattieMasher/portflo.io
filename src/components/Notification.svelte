<script>
  import { notifications } from '../stores/notifications.js';
  import NotificationItem from './NotificationItem.svelte';

  let visibleNotifications = [];

  $: visibleNotifications = $notifications;

  const removeNotification = (id) => {
    notifications.update((n) => n.filter((notif) => notif.id !== id));
  };
</script>

<div class="notification-container">
  {#each visibleNotifications as notification (notification.id)}
    <NotificationItem {notification} {removeNotification} />
  {/each}
</div>

<style>
  .notification-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
  }
</style>