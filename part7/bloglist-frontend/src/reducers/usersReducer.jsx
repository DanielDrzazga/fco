import {createSlice} from '@reduxjs/toolkit'
import user from '../services/user'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
})

export const {setUsers} = userSlice.actions

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await user.getAllUsers()

    dispatch(setUsers(users))
  }
}

export default userSlice.reducer
