import Navegacion from "./components/Navegacion.jsx";
import {createContext, useState} from "react";

export const PageContext = createContext(null);

function App() {

    const [ page, setPage ] = useState(null);

  return (
    <>
        <PageContext.Provider value={{page, setPage}}>
            <Navegacion />
            {page}
        </PageContext.Provider>
    </>
  )
}

export default App
