import { getServiceCenters } from "@/lib/db/queries/centers";
import BookingForm from "./_components/BookingForm";
import { CategoryType, CenterType, VehicleType } from "@/lib/db/types";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { getCategories } from "@/lib/db/queries/categories";

export default async function page() {

    const serviceCenters = await getServiceCenters() as CenterType[];
    const userVehicles = await getVehicles() as VehicleType[];
    const userCategories = await getCategories() as CategoryType[];

    const categories = userCategories.map((item) => {
        return {
            id: item.id,
            name: item.name,
            color: item.color
        }
    })



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
            <BookingForm centers={centers} vehicles={vehicles} categories={categories} />
        </div>
    )
}