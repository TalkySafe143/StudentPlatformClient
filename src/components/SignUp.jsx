import {motion, AnimatePresence} from "framer-motion";

export default function SignUp() {
    return (
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
                                            type="text"
                                            required
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
                                            type="text"
                                            required
                                            className="block w-full pl-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </label>

                                <div className={"pt-5"}>
                                    <button
                                        className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}