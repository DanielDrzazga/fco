import {Alert} from '@mui/material'
import {useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return (
    <Alert severity={notification.isError ? 'error' : 'success'}>
      {notification.message}
    </Alert>
  )
}

export default Notification
