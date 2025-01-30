import { elementStyles } from '../stores/elementStyles.js';
import { syncElementStylesToAPI } from './api.js';

export function updateElementStyle(elementId, property, value, subElement = null) {
  if (!elementId) return;

  elementStyles.update((styles) => {
    const updatedStyles = { ...styles };
    if (!updatedStyles[elementId]) updatedStyles[elementId] = {};

    if (subElement) {
      if (!updatedStyles[elementId][subElement]) updatedStyles[elementId][subElement] = {};
      updatedStyles[elementId][subElement][property] = value;
    } else {
      updatedStyles[elementId][property] = value;
    }

    console.log(`🔹 updateElementStyle updated ${elementId}:`, updatedStyles[elementId]);

    // syncElementStylesToAPI(elementId, updatedStyles[elementId]); ?

    return updatedStyles;
  });
}
