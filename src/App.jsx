import Navegacion from "./components/Navegacion.jsx";
import HomePage  from "./components/HomePage.jsx";
import {Button} from "@nextui-org/react";
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <>
            <Navegacion />
            <h1 className={"m-10 font-serif text-center scale-150"}>HOME</h1>
            
            <Footer />
    </>
  )
}

export default App
