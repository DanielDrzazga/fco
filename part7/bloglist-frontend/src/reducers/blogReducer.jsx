import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlicer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      const index = state.findIndex((blog) => blog.id === updatedBlog.id)
      if (index !== -1) {
        state[index] = updatedBlog
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addComment: (state, action) => {
      const payload = action.payload
      const addedComment = {
        id: payload.id,
        blog: payload.blog.id,
        user: payload.user.id,
        content: payload.content,
      }

      const blog = state.find((b) => b.id === addedComment.blog)
      if (blog) {
        blog.comments = [...blog.comments, addedComment]
      }
    },
  },
})

export const {setBlogs, addBlog, updateBlog, deleteBlog, addComment} =
  blogSlicer.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const patchBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlogById = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const addBlogComment = (blogId, commentContent) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, {
      content: commentContent,
    })

    dispatch(addComment(newComment))
  }
}

export default blogSlicer.reducer
