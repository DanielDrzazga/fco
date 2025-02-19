import { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';
import Recommended from './components/Recommended';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [allGenres, setAllGenres] = useState(() => {
    return JSON.parse(localStorage.getItem('allGenres')) || [];
  });

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    localStorage.setItem('allGenres', JSON.stringify(allGenres));
  }, [allGenres]);

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books
        show={page === 'books'}
        setFavoriteGenre={setFavoriteGenre}
        allGenres={allGenres}
        setAllGenres={setAllGenres}
      />
      <NewBook
        show={page === 'add'}
        allGenres={allGenres}
        setAllGenres={setAllGenres}
      />
      <Recommended show={page === 'recommend'} favoriteGenre={favoriteGenre} />
    </div>
  );
};

export default App;
