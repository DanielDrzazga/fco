import {useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import {useDispatch, useSelector} from 'react-redux'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer.jsx'
import {fetchBlogs} from './reducers/blogReducer.jsx'
import {setUser} from './reducers/loginReducer.jsx'
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import BlogView from './components/BlogView.jsx'
import Blogs from './components/Blogs.jsx'
import Navigation from './components/Navigation.jsx'

import {
  Container,
  Typography,
} from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  const handleMessage = (message, isError = false) => {
    dispatch(setNotification({message, isError}))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (!loggedUser) {
    return (
      <div>
        <Notification />
        <Login handleMessage={handleMessage} />
      </div>
    )
  }

  return (
    <Container>
      <Router>
        <Notification />

        <Navigation />
        <Typography variant="h2" gutterBottom></Typography>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/blogs"
            element={<Blogs handleMessage={handleMessage} user={loggedUser} />}
          />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
