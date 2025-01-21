import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlicer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    updateAnecdote(state, action){
      const updateAnecdote = action.payload
      return state.map((anecdote) => anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const {addAnecdote, updateAnecdote, setAnecdotes} = anecdoteSlicer.actions


export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create({content, votes: 0})
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlicer.reducer
