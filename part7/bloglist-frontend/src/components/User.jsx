import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import userService from '../services/user'
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const User = () => {
  const {id} = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getUserById(id)
      setUser(user)
    }
    fetchUser()
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Paper sx={{padding: 3, marginTop: 3}}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar
            alt={user.username}
            src={user.avatarUrl}
            sx={{width: 100, height: 100, marginRight: 2}}
          />
          <Box>
            <Typography variant="h5">{user.username}</Typography>
            <Typography variant="body1">{user.name}</Typography>
          </Box>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          Added Blogs
        </Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default User
