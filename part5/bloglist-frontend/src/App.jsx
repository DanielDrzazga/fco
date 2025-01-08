import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import Blogs from './components/Blogs';

const App = () => {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const handleMessage = (message, isError) => {
    setMessage({ message, isError });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  if (!user) {
    return (
      <div>
        <Notification message={message} />
        <Login setUser={setUser} handleMessage={handleMessage} />
      </div>
    );
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <p>
        {user.username} logged in <button onClick={logout}>logout</button>
      </p>
      <Blogs handleMessage={handleMessage} user={user} />
    </div>
  );
};

export default App;
