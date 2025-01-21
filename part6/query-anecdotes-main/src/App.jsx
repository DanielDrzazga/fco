import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './server/anecdoteService';
import { NotificationProvider, useNotification } from './NotificationContext';

const App = () => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    showNotification(`A vote for an anecdote: "${anecdote.content}"`);
    console.log('vote');
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    retryDelay: 1000,
  });

  const anecdotes = data || [];

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return (
      <div>
        The Anecdote service is unavailable due to server problems on localhost
      </div>
    );
  }

  return (
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
  );
};

export default App;
