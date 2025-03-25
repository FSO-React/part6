import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, cleanNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const sortedAnecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes))
  const filter = useSelector(state => state.filter)
  const anecdotes = filter === '' ? sortedAnecdotes : sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()
  
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`'${anecdote.content}' has been voted.`))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, 5000);
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList