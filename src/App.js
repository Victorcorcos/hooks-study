import logo from './logo.svg'
import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useCallback, useMemo, useRef } from 'react'
import './App.css'

function App() {
  const [contador, setContador] = useState(0)
  const ref = useRef(5)

  function incrementar() {
    setContador(contador + 1)
  }

  const funcaoNormal = () => {
    console.log('funcaoNormal:', contador)
  }

  const callbackAtualizado = useCallback(() => {
    console.log('callbackAtualizado:', contador)
  }, [contador])
  
  const callbackNaoAtualizado = useCallback(() => {
    console.log('callbackNaoAtualizado:', contador)
  }, [])

  const memoAtualizado = useMemo(() => {
    console.log('memoAtualizado:', contador)
    return contador
  }, [contador])

  const memoNaoAtualizado = useMemo(() => {
    console.log('memoNaoAtualizado:', contador)
    return contador
  }, [contador])

  const refTest = () => {
    console.log('ref:', ref)
  }


  return (
    <div>
      <p>contador: {contador}</p>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={funcaoNormal}>funcaoNormal</button>
      <button onClick={callbackAtualizado}>callbackAtualizado</button>
      <button onClick={callbackNaoAtualizado}>callbackNaoAtualizado</button>
      <button onClick={() => console.log('memoAtualizado:', contador)}>memoAtualizado</button>
      <button onClick={() => console.log('memoNaoAtualizado:', contador)}>memoNaoAtualizado</button>
      <button onClick={refTest}>refTest</button>
    </div>
  )
}

export default App
