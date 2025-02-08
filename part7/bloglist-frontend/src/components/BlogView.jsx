import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {patchBlog, addBlogComment} from '../reducers/blogReducer'
import {useState} from 'react'
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const BlogView = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [comment, setComment] = useState('')

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return <p>Ładowanie...</p>
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    try {
      dispatch(patchBlog(updatedBlog))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    dispatch(addBlogComment(id, comment))
    setComment('')
  }

  return (
    <>
      <Paper sx={{padding: 3, marginTop: 3}}>
        <Typography variant="h3" component="h1" gutterBottom>
          {blog.title}
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          By {blog.author}
        </Typography>
        <Typography variant="body1" paragraph>
          {blog.content}
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'space-between', marginTop: 2}}
        >
          <Button variant="contained" color="primary" onClick={handleLike}>
            Like {blog.likes}
          </Button>
        </Box>
        <Box sx={{marginTop: 3}}>
          <Typography variant="h6" component="h3" gutterBottom>
            Comments
          </Typography>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              sx={{marginBottom: 2}}
            />
            <Button variant="contained" color="primary" type="submit">
              Add Comment
            </Button>
          </form>
          <List>
            {blog.comments
              .slice()
              .reverse()
              .map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemText primary={comment.content} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Paper>
    </>
  )
}

export default BlogView
