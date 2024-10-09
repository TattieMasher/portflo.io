import { writable } from 'svelte/store';

export const user = writable({
  full_name: 'John Doe',
  bio: 'A passionate developer.',
  profile_picture:
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/KilmarnockLogo.svg/1200px-KilmarnockLogo.svg.png',
  skills: ['HTML', 'JavaScript', 'CSS'],
});