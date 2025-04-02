import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  
  const updatedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }
  
  const { status, data, error} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })
  if ( status === 'error' ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  if ( status === 'loading' || status === 'pending' ) {
    return <div>loading data...</div>
  }

  const anecdotes = data

  if (anecdotes.length === 0) {
    return (
      <div>
        <h3>Anecdote app</h3>
        <div>No anecdotes yet</div>
        <AnecdoteForm />
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
