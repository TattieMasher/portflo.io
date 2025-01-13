import { projects } from '../stores/projects.js';

export function updateComponent(projectIndex, containerIndex, componentIndex, changes) {
  projects.update((proj) => {
    return proj.map((projItem, projIdx) => {
      if (projIdx === projectIndex) {
        const updatedContainers = projItem.containers.map((containerItem, contIdx) => {
          if (contIdx === containerIndex) {
            const updatedComponents = containerItem.components.map((component, compIdx) => {
              if (compIdx === componentIndex) {
                return { ...component, ...changes };
              }
              return component;
            });
            return { ...containerItem, components: updatedComponents };
          }
          return containerItem;
        });
        return { ...projItem, containers: updatedContainers };
      }
      return projItem;
    });
  });
}
