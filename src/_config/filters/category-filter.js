export const categoryFilter = (collection, category) => {
  if (!category) return collection;
  const filtered = collection.filter(item => item.data.category == category);
  return filtered;
};
