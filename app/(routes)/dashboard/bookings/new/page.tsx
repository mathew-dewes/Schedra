import { getServiceCenters } from "@/lib/db/queries/centers";
import BookingForm from "./_components/BookingForm";
import { CategoryType, CenterType, VehicleType } from "@/lib/db/types";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { getCategories } from "@/lib/db/queries/categories";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

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
            <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/bookings'}>View Bookings</Link>
        
            </div>
               <BookingForm centers={centers} vehicles={vehicles} categories={categories} />
        </div>
    )
}