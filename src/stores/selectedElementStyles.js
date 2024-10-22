import { derived } from 'svelte/store';
import { selectedElement } from './selectedElement.js';
import { elementStyles } from './elementStyles.js';
import { defaultStyles } from '../utils/styleUtils.js';

export const selectedElementStyles = derived(
  [selectedElement, elementStyles],
  ([$selectedElement, $elementStyles]) => {
    return { ...defaultStyles, ...($elementStyles[$selectedElement] || {}) };
  }
);