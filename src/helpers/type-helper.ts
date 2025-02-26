export const getInt = (value: any) => {
  return !isNaN(parseFloat(value)) ? parseInt(value) : null;
};
