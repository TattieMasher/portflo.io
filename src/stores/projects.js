import { writable } from 'svelte/store';

export const projects = writable([
  {
    title: 'Project 1',
    description: 'Description of project 1',
    project_url: '#',
    containers: [
      {
        layout: 'article',
        components: [
          {
            title: 'Component 1.1',
            content: 'This is a text component in Project 1.',
            type: 'text',
          },
          {
            title: 'Component 1.2',
            content: 'https://via.placeholder.com/300',
            type: 'image',
          },
          {
            title: 'Component 1.3',
            images: [
              'https://via.placeholder.com/300x200?text=Slide+1',
              'https://via.placeholder.com/300x200?text=Slide+2',
              'https://via.placeholder.com/300x200?text=Slide+3',
            ],
            type: 'carousel',
          },
        ],
      },
    ],
  },
  {
    title: 'Project 2',
    description: 'Description of project 2',
    project_url: '#',
    containers: [
      {
        layout: 'grid',
        components: [
          {
            title: 'Component 2.1',
            content: 'This is a text component in Project 2.',
            type: 'text',
          },
        ],
      },
    ],
  },
]);