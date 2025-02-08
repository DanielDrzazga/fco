import blogService from '../services/blogs'
import {useDispatch, useSelector} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {useNavigate} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'
import BlogDialog from './BlogDialog'

const Blogs = ({handleMessage, user}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const addBlog = async ({title, author, url}) => {
    const newBlog = {
      title,
      author,
      url,
    }

    blogService.setToken(user.token)

    try {
      await dispatch(createBlog(newBlog))
      handleMessage(
        `A new blog "${newBlog.title}" by ${newBlog.author} added`,
        false
      )
    } catch (error) {
      handleMessage('Error adding blog', true)
    }
  }

  const sortedBlogs = blogs
    .slice()
    .sort((current, next) => next.likes - current.likes)

  const handleRowClick = (id) => {
    navigate(`/blogs/${id}`)
  }

  return (
    <>
      <div>
        <BlogDialog addBlog={addBlog} />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow
                key={blog.id}
                hover
                style={{cursor: 'pointer'}}
                onClick={() => handleRowClick(blog.id)}
              >
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Blogs
