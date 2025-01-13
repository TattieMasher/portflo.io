import { elementStyles } from '../stores/elementStyles.js';
import { syncElementStylesToAPI } from './api.js'; // New API helper

export function updateElementStyle(elementId, property, value, subElement = null) {
  if (elementId) {
    elementStyles.update((styles) => {
      const updatedStyles = { ...styles };
      if (!updatedStyles[elementId]) updatedStyles[elementId] = {};
      if (subElement) {
        if (!updatedStyles[elementId][subElement]) updatedStyles[elementId][subElement] = {};
        updatedStyles[elementId][subElement][property] = value;
      } else {
        updatedStyles[elementId][property] = value;
      }
      syncElementStylesToAPI(elementId, updatedStyles[elementId]); // Sync changes. Maybe just when save is hit? Good for testing atm anyway
      return updatedStyles;
    });
  }
}