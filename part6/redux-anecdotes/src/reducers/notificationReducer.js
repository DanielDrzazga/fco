import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(){
            return ''
        }
    }
})

export const showNotification = (message, time = 5) => {
    return (dispatch) => {
      dispatch(setNotification(message));
      setTimeout(() => {
        dispatch(clearNotification());
      }, time * 1000);
    };
  };

export const {setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer