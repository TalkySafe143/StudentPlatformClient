import {motion, AnimatePresence} from "framer-motion";
import Navegacion from "./Navegacion.jsx";
import {useContext, useEffect, useState} from "react";
import {useAlert} from "react-alert";
import {useNavigate} from "react-router-dom";
import {AppContext} from "./UserContextWrapper.jsx";

export default function Login() {

    const navigate = useNavigate()
    const alert = useAlert();
    const [cc, setCC] = useState("");
    const [password, setPassword] = useState("");

    async function loginAPI(e) {
        console.log(import.meta.env)
        try {
            const data = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
                method: 'POST',
                headers: new Headers({
                    "Authorization" : `Basic ${btoa(`${cc}:${password}`)}`
                })
            })

            const response = await data.json();

            if (response.err) alert.error('Alguna informacion esta incorrecta');
            else {

                localStorage.setItem('jwt', response.token);
                localStorage.setItem('user', cc);
                navigate('/');
            }
        } catch (e) {
            alert.error('Ups, alguna de tu informacion es incorrecta')
        } finally {
            setCC("")
            setPassword("");
        }
    }

    return (
        <>
        <Navegacion />
        <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
        >

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Cedula de ciudadania
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    value={cc}
                                    onChange={e => setCC(e.target.value)}
                                    className="block w-full pl-5 rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-secondary hover:text-indigo-500">
                                        Olvidó la contraseña?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={loginAPI}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        No es miembro?{' '}
                        <a href="#" className="font-semibold leading-6 text-secondary hover:text-indigo-500">
                            Comience una prueba gratis de 14 días
                        </a>
                    </p>
                </div>
                </div>
            </motion.div>
            </AnimatePresence>
        </>
    );
}
