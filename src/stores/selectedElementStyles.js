import { derived } from 'svelte/store';
import { selectedElement } from './selectedElement.js';
import { elementStyles } from './elementStyles.js';

export const selectedElementStyles = derived(
  [selectedElement, elementStyles],
  ([$selectedElement, $elementStyles]) => {
    return $elementStyles[$selectedElement] || {};
  }
);