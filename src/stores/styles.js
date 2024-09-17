// stores/styles.js
import { writable } from 'svelte/store';

export const styles = writable({
  fontSize: '16px',
  backgroundColor: '#ffffff',
  color: '#000000',
});
