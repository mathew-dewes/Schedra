
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";
import RenewalFormClient from "./RenewalFormClient";



export default async function RenewalForm(){
const userVehicles = await getVehicles() as VehicleType[];
const vehicles = userVehicles.map((item) => {
            return {
                id: item.id,
                name: item.make + " " + item.model + " - " + item.plate_number
            }
        })
        return <RenewalFormClient vehicles={vehicles} />
      
}