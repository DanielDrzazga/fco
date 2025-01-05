const blogRoute = require('express').Router()
const Blog = require('../models/blog')

blogRoute.get('/', (request, response) => {
    Blog.find({})
    .then(blog => {
        response.json(blog)
    })
})

blogRoute.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

blogRoute.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

blogRoute.delete('/:id', (request, response) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(202).end()
        })
        .catch(error => {
            next(error)
        })
})

blogRoute.put('/:id', (request,response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => {
            next(error)
        })
})

module.exports = blogRoute