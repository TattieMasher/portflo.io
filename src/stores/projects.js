// stores/projects.js
import { writable } from 'svelte/store';

export const projects = writable([
  {
    title: 'Project 1',
    description: 'Description of project 1',
    project_url: '#',
    components: [
      {
        title: 'Component 1.1',
        content: 'This is a text component in Project 1.',
        type: 'text',
        style: 'text-center border p-4 rounded bg-blue-100',
      },
      {
        title: 'Component 1.2',
        content: 'https://via.placeholder.com/300',
        type: 'image',
        style: 'border p-4 rounded bg-red-100',
      },
    ],
  },
  {
    title: 'Project 2',
    description: 'Description of project 2',
    project_url: '#',
    components: [
      {
        title: 'Component 2.1',
        content: 'This is a text component in Project 2.',
        type: 'text',
        style: 'text-center bg-green-100',
      },
    ],
  },
]);
