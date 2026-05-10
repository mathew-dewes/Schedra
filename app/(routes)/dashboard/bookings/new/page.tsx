import { getServiceCenters } from "@/lib/db/queries/centers";
import BookingForm from "./_components/BookingForm";
import { CenterType, VehicleType } from "@/lib/db/types";
import { getVehicles } from "@/lib/db/queries/vehicles";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReturnToDash from "../../_components/buttons/ReturnToDash";

export default async function page() {

    const serviceCenters = await getServiceCenters() as CenterType[];
    const userVehicles = await getVehicles() as VehicleType[];

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



    return (
        <div>
            <div className="flex gap-2">
                <ReturnToDash />
                <Link className={buttonVariants()} href={'/dashboard/bookings'}>View Bookings</Link>

            </div>
            <BookingForm centers={centers} vehicles={vehicles} />
        </div>
    )
}