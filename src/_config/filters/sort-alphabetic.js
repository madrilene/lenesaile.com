export const sortAlphabetically = (array, key = 'title') => {
  return array.sort((a, b) => {
    const aVal = a?.[key] || '';
    const bVal = b?.[key] || '';
    return aVal.toString().localeCompare(bVal.toString());
  });
};
