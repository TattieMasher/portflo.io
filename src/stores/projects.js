import { writable, get } from 'svelte/store';
import { elementStyles } from './elementStyles.js'; // Import styles store

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

/* Just using for troubleshooting for now, but this will output the data to save to the API. */
export function exportPortfolio() {
  let projectData = get(projects);
  let stylesData = get(elementStyles); // Fetch stored styles

  // Merge styles into components dynamically
  const mergedData = projectData.map((project, projectIndex) => ({
    ...project,
    containers: project.containers.map((container, containerIndex) => ({
      ...container,
      components: container.components.map((component, componentIndex) => {
        const componentId = `project-${projectIndex}-container-${containerIndex}-component-${componentIndex}`;
        
        return {
          ...component,
          styles: stylesData[componentId] || {} // Attach stored styles (or empty object if none)
        };
      })
    }))
  }));

  return JSON.stringify(mergedData, null, 2);
}
