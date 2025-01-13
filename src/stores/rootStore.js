import { writable, derived } from 'svelte/store';
import { projects } from './projects.js';
import { selectedElement } from './selectedElement.js';
import { selectedElementStyles } from './selectedElementStyles.js';
import { elementStyles } from './elementStyles.js';
import { notifications } from './notifications.js';
import { user } from './user.js';

// Combine states into a root store
export const rootStore = {
  projects,
  selectedElement,
  selectedElementStyles,
  elementStyles,
  notifications,
  user,
};

// Derived stores for common logic
export const activeProject = derived(
  [projects, selectedElement],
  ([$projects, $selectedElement]) => {
    if ($selectedElement?.startsWith('project-')) {
      const projectIndex = parseInt($selectedElement.split('-')[1]);
      return $projects[projectIndex];
    }
    return null;
  }
);
