import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const sortAnecdotes = (state) => {
  return  [...state].sort((a, b) => b.votes - a.votes)
}

const anecdoteSlicer = createSlice({
  name: 'anecdote',
  initialState: sortAnecdotes(initialState),
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (anecdote) anecdote.votes += 1
      sortAnecdotes(state)
    },
    createAnecdote(state, action) {
      const newState = [...state, asObject(action.payload)];
      sortAnecdotes(newState);
    }
  }
})

export const {voteAnecdote, createAnecdote} = anecdoteSlicer.actions
export default anecdoteSlicer.reducer
