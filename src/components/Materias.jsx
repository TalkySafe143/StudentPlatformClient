import {AnimatePresence, motion} from "framer-motion";
import {Spacer} from "@nextui-org/react";
import {CustomCard} from "./CustomCard";


export default function Materias() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.5 }}ss
            >
                <div className="flex justify-center m-10">
                    <h1 className="text-3xl mr-10 font-bold">Materias</h1>
                </div>
                <div className="flex place-content-center m-10">
                    <CustomCard />
                    <Spacer x={200} />
                    <CustomCard />
                    <Spacer x={200} />
                    <CustomCard />
                </div>

            </motion.div>
        </AnimatePresence>
    )
}