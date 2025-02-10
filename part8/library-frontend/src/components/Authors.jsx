import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation ($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const { loading, error, data } = useQuery(GET_AUTHORS);

  console.log(data);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const authors = data.allAuthors ?? [];

  const submit = async (event) => {
    event.preventDefault();

    if (selectedAuthor) {
      await editAuthor({
        variables: {
          name: selectedAuthor,
          born: Number(born),
        },
      });

      setSelectedAuthor('');
      setBorn('');
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">Select author</option>
            {data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
