import {AnimatePresence, motion} from "framer-motion";

export default function Materias() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
            >
                <div className="flex justify-center items-center m-10">
                    <h1 className="text-3xl mr-10">Materias</h1>
                </div>
                <div className= "flex bg-slate-500 ml-5">
                        <p className = "text-inherit pl-10">Fundamentos de ingeniería de SW</p>
                </div>

            </motion.div>
        </AnimatePresence>
    )
}