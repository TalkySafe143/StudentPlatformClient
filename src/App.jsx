import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "@nextui-org/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button>Como fueron las locas</Button>
        <Button> Como fue con el template</Button>
      <Button>Esta es otra modificacion para que retocen, malparido canson</Button>
    </>
  )
}

export default App
