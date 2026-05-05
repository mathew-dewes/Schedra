import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Actions(){
    return(
        <div>
            <h2 className="font-semibold">Quick Actions:</h2>
    <div className="md:flex grid grid-cols-2 gap-2 mt-2">
            <Link className={buttonVariants()} href={'/dashboard/bookings/new'}>+ Add Booking</Link>
            <Link className={buttonVariants()} href={'/dashboard/providers/new'}>+ Add Provider</Link>
            <Link className={buttonVariants()} href={'/dashboard/vehicles/new'}>+ Add Vehicle</Link>
            {/* <Button>+ View Calendar</Button> */}
        </div>
        </div>
    
    )
}