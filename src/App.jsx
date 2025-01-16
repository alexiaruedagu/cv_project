import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { CvForm } from './CVForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CvForm />
    </>
  )
}

export default App
