import { writable, get, derived } from 'svelte/store';
import { elementStyles } from './elementStyles.js';

export const projects = writable([
  {
    title: 'Project 1',
    description: 'Description of project 1',
    project_url: '#',
    skills: ['JavaScript', 'HTML', 'CSS'],
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
    skills: [],
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

// includes styles dynamically
export const mergedProjects = derived(
  [projects, elementStyles],
  ([$projects, $elementStyles]) => {
    return $projects.map((project, projectIndex) => ({
      ...project,
      containers: project.containers.map((container, containerIndex) => ({
        ...container,
        components: container.components.map((component, componentIndex) => {
          const componentId = `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`;
          return {
            ...component,
            styles: $elementStyles[componentId] || {},
          };
        }),
      })),
    }));
  }
);

export function exportPortfolio() {
  return new Promise((resolve) => {
    const unsubscribe = mergedProjects.subscribe((data) => {
      console.log("Debug: mergedProjects Data (to be exported):", data);
      if (data.length === 0) console.warn("⚠️ No projects found in mergedProjects!");

      resolve(JSON.stringify(data, null, 2));
      setTimeout(() => unsubscribe(), 0);
    });
  });
}
