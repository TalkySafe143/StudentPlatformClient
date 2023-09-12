import {Button} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import PublicarMaterial from "./PublicarMaterial.jsx";

export default function Materiales() {

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
            >
                <div className="flex justify-center items-center m-10">
                    <h1 className="text-3xl mr-10">Materiales</h1>
                    <PublicarMaterial />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}