import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Materias from "./components/Materias.jsx";
import Materiales from "./components/Materiales.jsx";
import { UserContextWrapper } from './components/UserContextWrapper.jsx'
import MainMaterias from './components/MainMaterias.jsx'

const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

fetch(`${import.meta.env.VITE_API_URL}/api/material/`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
}).then(res => {
    if (res.status === 401) throw 'noJWT'
})
    .catch(err => {
        if(err === 'noJWT') {
            localStorage.removeItem("user");
            localStorage.removeItem("jwt");
        }
    });

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <SignUp />
    },
    {
        path: '/materias',
        element: <MainMaterias />
    },
    {
        path: '/materiales',
        element: <Materiales />
    },
    {
        path: '/materias/gestionar',
        element: <Materias />
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserContextWrapper>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
              <NextUIProvider>
                  <RouterProvider router={router}/>
              </NextUIProvider>
          </AlertProvider>
      </UserContextWrapper>
  </React.StrictMode>,
)
