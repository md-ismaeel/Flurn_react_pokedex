import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { Home } from './Page/Home/Home';

function App() {
  const [count, setCount] = useState(0)
  const { pokemon } = useSelector((state) => state.PokemonSlice);
  console.log(pokemon);


  return (
    <>
      <h1>Hello world</h1>
      <Home/>
    </>
  )
}

export default App
