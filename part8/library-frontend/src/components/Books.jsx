import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    allBooks {
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

const Books = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data.allBooks ?? [];

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
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
    </div>
  );
};

export default Books;
