export const cssPropertyMap = {
  backgroundColor: 'background-color',
  fontSize: 'font-size',
  textAlign: 'text-align',
  color: 'color',
  width: 'width',
  height: 'height',
  borderRadius: 'border-radius',
};

export const defaultStyles = {
  backgroundColor: 'transparent',
  fontSize: '16px',
  textAlign: 'left',
  color: '#ffffff',
  width: 'auto',
  height: 'auto',
  borderRadius: '0px',
};

export const getStyleString = (styles) => {
  const combinedStyles = { ...defaultStyles, ...styles };
  return Object.entries(combinedStyles)
    .map(([key, value]) => `${cssPropertyMap[key] || key}: ${value};`)
    .join(' ');
};