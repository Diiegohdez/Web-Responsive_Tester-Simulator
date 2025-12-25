import { useState } from 'react'
import './App.css'
import ResponsiveTester from './pages/ResponsiveTester.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResponsiveTester />
    </>
  )
}

export default App
