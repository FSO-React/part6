import { useEffect } from 'react'

import Notes from "./components/Notes" 
import NewNote from "./components/NewNote"
import VisibilityFilter from "./components/VisibilityFilter"

import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
