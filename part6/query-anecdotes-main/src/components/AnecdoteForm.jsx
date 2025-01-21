import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../server/anecdoteService';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
      showNotification('The anecdote has been successfully added');
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      showNotification('The anecdote must be at least 5 characters long!');
      return;
    }

    newAnecdoteMutation.mutate({ content, votes: 0 });
    event.target.anecdote.value = '';
    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
