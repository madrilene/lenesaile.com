// projects english
const getProjectsEN = collection => {
  const projects = collection.getFilteredByGlob('./src/en/projects/*.md');
  return projects.reverse();
};

// blog english
const getBlogsEN = collection => {
  const blogs = collection.getFilteredByGlob('./src/en/blog/*.md');
  return blogs.reverse();
};

module.exports = {
  getProjectsEN,
  getBlogsEN
};
