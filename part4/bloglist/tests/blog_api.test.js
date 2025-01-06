const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'https://blogs1.com',
    likes: 1,
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'https://blogs2.com',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    assert.strictEqual(blog.hasOwnProperty('id'), true)
  })
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'Title 3',
    author: 'Author 3',
    url: 'https://blogs3.com',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('Title 3'))
})

test('if likes is missing, it defaults set to 0', async () => {
  const newBlog = {
    title: 'Title 3',
    author: 'Author 3',
    url: 'https://blogs3.com',
  }

  const response = await api.post('/api/blogs').send(newBlog).expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = { author: 'Author 3' }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogs = await Blog.find({})
  const blogToDelete = blogs[0]
  console.log(`/api/blogs/${blogToDelete.id}`)
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length -1)

  const ids = response.body.map(b => b.id)
  assert(!ids.includes(blogToDelete.id))
})

after(async () => {
  await mongoose.connection.close()
})
