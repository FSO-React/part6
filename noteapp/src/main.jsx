import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { noteReducer } from './reducers/noteReducer'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

const store = createStore(noteReducer)
renderApp()
store.subscribe(renderApp)