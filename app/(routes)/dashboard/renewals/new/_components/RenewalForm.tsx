
import { getVehicles } from "@/lib/db/queries/vehicles";

import RenewalFormClient from "./RenewalFormClient";
import { Vehicle } from "@/lib/types";



export default async function RenewalForm(){
const userVehicles = await getVehicles() as Vehicle[];
const vehicles = userVehicles.map((item) => {
            return {
                id: item.id,
                name: item.make + " " + item.model + " - " + item.plate_number
            }
        })
        return <RenewalFormClient vehicles={vehicles} />
      
}