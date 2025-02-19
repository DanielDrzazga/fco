import { gql, useQuery } from '@apollo/client';

const GET_BOOKS_BY_GENRE = gql`
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

const Recommended = ({ show, favoriteGenre }) => {
  const { loading, error, data } = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre || null },
  });

  if (!show) {
    return null;
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data.allBooks ?? [];

  const filteredBooks = favoriteGenre
    ? books.filter((book) => book.genres.includes(favoriteGenre))
    : [];

  if (filteredBooks.length === 0) {
    return <p>No books found for the selected genre.</p>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author?.name ?? 'Unknown'}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
