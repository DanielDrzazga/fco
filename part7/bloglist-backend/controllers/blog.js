const blogRoute = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1,name: 1 })
    .populate('comments')

  response.json(blogs)
})

blogRoute.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const newBlog = await Blog.findById(savedBlog.id)
    .populate('user', { username: 1,name: 1 })
    .populate('comments', { content: 1 })
  response.status(201).json(newBlog)
})

blogRoute.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1,name: 1 })
    .populate('comments', { content: 1 })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRoute.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'Only the creator can delete the blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRoute.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .populate('user', { username: 1,name: 1 })
    .populate('comments', { content: 1 })

  response.json(updatedBlog)
})

blogRoute.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const comment = new Comment({
    content: body.content,
    user: user._id,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  const newComment = await Comment.findById(savedComment.id)
    .populate('user')
    .populate('blog')

  response.status(201).json(newComment)
})

module.exports = blogRoute
