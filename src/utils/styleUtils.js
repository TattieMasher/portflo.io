export const cssPropertyMap = {
  backgroundColor: 'background-color',
  fontSize: 'font-size',
  textAlign: 'text-align',
  color: 'color',
};

export const defaultStyles = {
  backgroundColor: 'transparent',
  fontSize: '16px',
  textAlign: 'left',
  color: '#ffffff',
};

export const getStyleString = (styles) => {
  const combinedStyles = { ...defaultStyles, ...styles };
  return Object.entries(combinedStyles)
    .map(([key, value]) => `${cssPropertyMap[key] || key}: ${value};`)
    .join(' ');
};