import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useState} from "react";
import { useAlert } from 'react-alert'
import Navegacion from "./Navegacion.jsx";

export default function SignUp() {

    const alert = useAlert();
    const [cc, setCC] = useState("");
    const [name, setName] = useState("");
    const [semester, setSemester] = useState(0);
    const [career, setCareer] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    async function registrarEstudiante(e) {
        try {
            const data = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cc,
                    name,
                    semester,
                    career,
                    password
                })
            });

            const json = await data.json();
            if (json.err) alert.error('Ya se creó ese usuario')
            else alert.success('Usuario creado correctamente')
        } catch (e) {
            setStatus('error');
        } finally {
            setName("");
            setSemester(0);
            setCareer("");
            setPassword("");
            setCC("");
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
                            Sign Up
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="CC" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cedula de ciudadania
                                    <div className="mt-2">
                                        <input
                                            id="CC"
                                            name="CC"
                                            type="text"
                                            required
                                            value={cc}
                                            onChange={e => setCC(e.target.value)}
                                            className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </label>

                                <label htmlFor="Nombre" className="pt-1 block text-sm font-medium leading-6 text-gray-900">
                                    Nombre
                                    <div className="mt-2">
                                        <input
                                            id="Nombre"
                                            name="Nombre"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </label>

                                <label htmlFor="Semestre" className="pt-1 block text-sm font-medium leading-6 text-gray-900">
                                    Semestre
                                    <div className="mt-2">
                                        <input
                                            id="Semestre"
                                            name="Semestre"
                                            type="number"
                                            min={0}
                                            required
                                            value={semester}
                                            onChange={e => setSemester(Number(e.target.value))}
                                            className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </label>

                                <label htmlFor="Carrera" className="pt-1 block text-sm font-medium leading-6 text-gray-900">
                                    Carrera
                                    <div className="mt-2">
                                        <input
                                            id="Carrera"
                                            name="Carrera"
                                            type="text"
                                            required
                                            value={career}
                                            onChange={e => setCareer(e.target.value)}
                                            className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </label>

                                <label htmlFor="C" className="pt-1 block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                    <div className="mt-2">
                                        <input
                                            id="C"
                                            name="C"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </label>

                                <div className={"pt-5"}>
                                    <button
                                        className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={registrarEstudiante}
                                    >
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="m-auto p-8 transition">
                        { status === 'success' ? "Usuario creado correctamente" : (
                            status === 'error' ? "¿Ya existe un usuario con esa cedula?" : ""
                        ) }
                    </h1>
                </div>
            </motion.div>
        </AnimatePresence>
        </>
    )
}