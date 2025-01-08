import { elementStyles } from '../stores/elementStyles.js';

export function updateElementStyle(elementId, property, value, subElement = null) {
  if (elementId) {
    elementStyles.update((styles) => {
      const updatedStyles = { ...styles };
      if (!updatedStyles[elementId]) {
        updatedStyles[elementId] = {};
      }
      if (subElement) {
        if (!updatedStyles[elementId][subElement]) {
          updatedStyles[elementId][subElement] = {};
        }
        updatedStyles[elementId][subElement][property] = value;
      } else {
        updatedStyles[elementId][property] = value;
      }
      return updatedStyles;
    });
  }
}
