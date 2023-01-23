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

// projects spanish
const getProjectsES = collection => {
  const projects = collection.getFilteredByGlob('./src/es/projects/*.md');
  return projects.reverse();
};

// blog spanish
const getBlogsES = collection => {
  const blogs = collection.getFilteredByGlob('./src/es/blog/*.md');
  return blogs.reverse();
};

// projects german
const getProjectsDE = collection => {
  const projects = collection.getFilteredByGlob('./src/de/projects/*.md');
  return projects.reverse();
};

// blog german
const getBlogsDE = collection => {
  const blogs = collection.getFilteredByGlob('./src/de/blog/*.md');
  return blogs.reverse();
};

const getBlogsAllFullLang = collection => {
  return collection
    .getFilteredByGlob('./src/*/blog/*.md')
    .filter(post => post.data.category == 'blogpost');
};

const getBlogsAllLang = collection => {
  return collection.getFilteredByGlob('./src/*/blog/*.md');
};

module.exports = {
  getProjectsEN,
  getBlogsEN,
  getProjectsES,
  getBlogsES,
  getProjectsDE,
  getBlogsDE,
  getBlogsAllFullLang,
  getBlogsAllLang
};
