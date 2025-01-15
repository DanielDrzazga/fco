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

const updateVote = (state, action) => {
  const id = action.payload.id;
  const noteToVote = state.find((element) => element.id === id);
  const updatedNote = {
    ...noteToVote,
    votes: noteToVote.votes + 1,
  };
  return sortAnecdotes(
    state.map((note) => (note.id === id ? updatedNote : note))
  )
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      return updateVote(state, action)
    case 'NEW_ANECDOTE':
      return sortAnecdotes([...state, asObject(action.payload)])
    default:
      return sortAnecdotes(state);
  }
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id },
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: content,
  };
};


export default reducer;
