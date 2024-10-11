import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(message, type = 'info') {
  notifications.update((n) => {
    return [...n, { message, type, id: Date.now() }];
  });
}