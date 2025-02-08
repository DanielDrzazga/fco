import {createSlice} from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const {setUser, clearUser} = loginSlice.actions

export default loginSlice.reducer
