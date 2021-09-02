import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Lesson05 from './lessons/lesson05'
import PureCanvas from './lessons/pureCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PureCanvas />
      <Lesson05 />
    </div>
  )
}

export default App
