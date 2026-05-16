import { getServiceCenters } from "@/lib/db/queries/centers";
import BookingFormClient from "./BookingFormClient";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { CenterType, VehicleType } from "@/lib/db/types";

export default async function BookingForm(){

    const [fetchServiceCenters, fetchUserVehicles] = await Promise.all([getServiceCenters(), getVehicles()])

    const serviceCenters = fetchServiceCenters as CenterType[];
    const userVehicles = fetchUserVehicles as VehicleType[];
    
        const centers = serviceCenters.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        });
    
        const vehicles = userVehicles.map((item) => {
            return {
                id: item.id,
                name: item.make + " " + item.model + " - " + item.plate_number
            }
        })
    return <BookingFormClient centers={centers} vehicles={vehicles}/>
}