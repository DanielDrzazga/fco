import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppBar, Button, Toolbar} from '@mui/material'
import {clearUser} from '../reducers/loginReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearUser())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          component={Link}
          to="/blogs"
          sx={{my: 2, color: 'white', display: 'block'}}
        >
          Blogs
        </Button>
        <Button
          component={Link}
          to="/users"
          sx={{my: 2, color: 'white', display: 'block'}}
        >
          Users
        </Button>
        {loggedUser.username} logged in{' '}
        <Button
          variant="outlined"
          onClick={logout}
          sx={{my: 2, color: 'white', display: 'block'}}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
