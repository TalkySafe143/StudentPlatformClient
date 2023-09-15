
import {Card} from "@nextui-org/react";

export const CustomCard = () => (
  <Card className="w-[400px] space-y-10 p-6" radius="3xl">
    <div className="h-10 rounded-lg bg-gray-300 text-center ">
        <h1>Nombre materia</h1>
    </div>
    <div className="space-y-5">
      <div className="h-3 w-3/5 rounded-lg "> <p>Listado de materiales que tiene esa materia</p></div>
      <div className="h-3 w-4/5 rounded-lg "> </div>
      <div className="h-3 w-2/5 rounded-lg "> </div>
    </div>
  </Card>
);
