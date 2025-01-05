const lodash = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((prev, current) =>
    current.likes > prev.likes ? current : prev
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCounts = lodash.countBy(blogs, 'author');
  const topAuthor = lodash.maxBy(
    Object.entries(authorCounts),
    ([, count]) => count
  );

  return {
    author: topAuthor[0],
    blogs: topAuthor[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const topAuthor = lodash.maxBy(
    Object.entries(likesByAuthor),
    ([, likes]) => likes
  );

  return {
    author: topAuthor[0],
    likes: topAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
