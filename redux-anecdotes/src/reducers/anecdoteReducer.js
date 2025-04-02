import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const anecdoteToUpdate = action.payload
      return state.map(anecdote =>
        anecdote.id !== anecdoteToUpdate.id ? anecdote : anecdoteToUpdate
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getById(id)
    if (!anecdoteToVote) {
      return
    }
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const anecdote = await anecdoteService.update(anecdoteToVote.id, updatedAnecdote)
    dispatch(updateAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer