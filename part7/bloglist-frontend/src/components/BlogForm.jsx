import React, {useState} from 'react'
import {TextField, Button, Box} from '@mui/material'

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({title, author, url})
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        variant="outlined"
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </Box>
  )
}

export default BlogForm
