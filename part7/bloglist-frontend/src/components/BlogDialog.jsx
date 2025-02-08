import React, {useState} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import BlogForm from './BlogForm'

const BlogDialog = ({addBlog}) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddBlog = (blog) => {
    addBlog(blog)
    handleClose()
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add blog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new blog</DialogTitle>
        <DialogContent>
          <BlogForm addBlog={handleAddBlog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BlogDialog
