// projects english
const getProjectsEN = collection => {
  const projects = collection.getFilteredByGlob('./src/en/projects/*.md');
  return projects;
};

// blog english
const getBlogsEN = collection => {
  const blogs = collection.getFilteredByGlob('./src/en/blog/*.md');
  return blogs;
};

module.exports = {
  getProjectsEN,
  getBlogsEN
};
