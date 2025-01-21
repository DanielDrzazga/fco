import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  message: '',
  isVisible: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.message, isVisible: true };
    case 'HIDE':
      return { ...state, isVisible: false };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message) => {
    dispatch({ type: 'SHOW', message });
    setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

export default NotificationContext;
