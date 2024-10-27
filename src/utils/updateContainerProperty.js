import { projects } from '../stores/projects.js';

export function updateContainerProperty(projectIndex, containerIndex, property, value) {
  projects.update((proj) => {
    const updatedProjects = proj.map((project, idx) => {
      if (idx === projectIndex) {
        const updatedContainers = project.containers.map((container, cIdx) => {
          if (cIdx === containerIndex) {
            return {
              ...container,
              [property]: value,
            };
          }
          return container;
        });
        return {
          ...project,
          containers: updatedContainers,
        };
      }
      return project;
    });
    return updatedProjects;
  });
}
