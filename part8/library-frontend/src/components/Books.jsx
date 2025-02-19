import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

const GET_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        id
        name
        bookCount
        born
      }
      published
      genres
    }
  }
`;

const Books = ({ show, allGenres, setFavoriteGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { genre: selectedGenre || null },
  });

  if (!show) return null;
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data?.allBooks ?? [];

  const handleGenreClick = (genre) => {
    setFavoriteGenre(genre);
    setSelectedGenre(genre);
  };

  return (
    <div>
      <h2>Books</h2>

      <div>
        <h3>Filter by genre:</h3>
        <button onClick={() => handleGenreClick(null)}>All genres</button>
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            style={{ fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
          >
            {genre}
          </button>
        ))}
      </div>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author?.name ?? 'Unknown'}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
