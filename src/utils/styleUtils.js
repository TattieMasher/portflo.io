export const cssPropertyMap = {
  backgroundColor: 'background-color',
  fontSize: 'font-size',
  textAlign: 'text-align',
  color: 'color',
  width: 'width',
  height: 'height',
  borderRadius: 'border-radius',
  fontFamily: 'font-family',
  fontWeight: 'font-weight',
  textDecoration: 'text-decoration',
  borderWidth: 'border-width',
  borderStyle: 'border-style',
  borderColor: 'border-color',
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
  fontFamily: 'Arial',
  fontWeight: 'normal',
  textDecoration: 'none',
  // Add more 
};

export const getStyleString = (styles) => {
  const combinedStyles = { ...defaultStyles, ...styles };
  return Object.entries(combinedStyles)
    .map(([key, value]) => `${cssPropertyMap[key] || key}: ${value};`)
    .join(' ');
};