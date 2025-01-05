const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    ...listWithOneBlog,
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
  ];

  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 27);
  });
});

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      title: 'Blog 1',
      author: 'Author 1',
      likes: 10,
    },
    {
      title: 'Blog 2',
      author: 'Author 2',
      likes: 20,
    },
    {
      title: 'Blog 3',
      author: 'Author 3',
      likes: 15,
    },
  ];

  test('returns the blog with the highest number of likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    assert.deepStrictEqual(result, listWithMultipleBlogs[1]);
  });

  test('returns null for an empty list', () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });
});

describe('most blogs', () => {
  const listWithMultipleBlogs = [
    { author: 'Author 1' },
    { author: 'Author 2' },
    { author: 'Author 1' },
    { author: 'Author 3' },
    { author: 'Author 2' },
    { author: 'Author 2' },
  ];

  test('returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: 'Author 2', blogs: 3 });
  });

  test('returns null for an empty list', () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });
});

describe('most likes', () => {
  const listWithMultipleBlogs = [
    { author: 'Author 1', likes: 10 },
    { author: 'Author 2', likes: 7 },
    { author: 'Author 1', likes: 5 },
    { author: 'Author 3', likes: 100 },
    { author: 'Author 2', likes: 15 },
  ];

  test('returns the author with the most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: 'Author 3', likes: 100 });
  });

  test('returns null for an empty list', () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });
});
