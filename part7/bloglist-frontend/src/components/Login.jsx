import {useState} from 'react'
import loginService from '../services/login'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../reducers/loginReducer'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

const Login = ({handleMessage}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      handleMessage('Wrong credentials', true)
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{padding: 3, marginTop: 3}}>
        <Typography variant="h5" component="h1" gutterBottom>
          Log in to application
        </Typography>
        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={({target}) => setUsername(target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={({target}) => setPassword(target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../reducers/loginReducer';
// import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

// const Login = ({ handleMessage }) => {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const user = { username };
//       dispatch(setUser(user));
//       window.localStorage.setItem('loggedUser', JSON.stringify(user));
//     } catch (exception) {
//       handleMessage('Wrong credentials', true);
//     }
//   };

//   return (

//   );
// };

// export default Login;
