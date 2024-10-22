import { elementStyles } from '../stores/elementStyles.js';

export function updateElementStyle(elementId, property, value) {
  if (elementId) {
    elementStyles.update((styles) => {
      const updatedStyles = { ...styles };
      if (!updatedStyles[elementId]) {
        updatedStyles[elementId] = {};
      }
      updatedStyles[elementId][property] = value;
      return updatedStyles;
    });
  }
}