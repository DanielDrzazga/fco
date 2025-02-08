import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUsers} from '../reducers/usersReducer'
import {Link} from 'react-router-dom'
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
