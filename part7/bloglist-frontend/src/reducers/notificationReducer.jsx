import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => '',
  },
})

export const {setNotification, clearNotification} = notificationSlice.actions

export const displayMessage = ({message, isError = false}) => {
  dispatch(setNotification({message, isError}))

  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}

export default notificationSlice.reducer

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}
