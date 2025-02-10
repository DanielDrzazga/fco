import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    allBooks {
      author
      genres
      published
      title
    }
  }
`;

const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data.allBooks ?? [];

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
