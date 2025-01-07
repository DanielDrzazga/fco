const Notification = ({ message }) => {
  console.log(message);

  if (!message) {
    return null;
  }

  const style = {
    color: message.isError ? 'red' : 'green',
    border: '1px solid',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={style}>{message.message}</div>;
};

export default Notification;
