// utils/styleUtils.js
export const cssPropertyMap = {
  backgroundColor: 'background-color',
  fontSize: 'font-size',
  textAlign: 'text-align',
  color: 'color',
  width: 'width',
  height: 'height',
  borderRadius: 'border-radius',
  // Add more 
};

export const defaultStyles = {
  backgroundColor: 'transparent',
  fontSize: '16px',
  textAlign: 'left',
  color: '#ffffff',
  width: 'auto',
  height: 'auto',
  borderRadius: '0px',
  // Add more 
};

export const getStyleString = (styles) => {
  const combinedStyles = { ...defaultStyles, ...styles };
  return Object.entries(combinedStyles)
    .map(([key, value]) => `${cssPropertyMap[key] || key}: ${value};`)
    .join(' ');
};