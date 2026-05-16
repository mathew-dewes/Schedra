
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReturnToDash from "../../_components/buttons/ReturnToDash";
import BookingForm from "./_components/BookingForm";
import { Suspense } from "react";
import { LoadingForm } from "@/components/web/skeletons/LoadingForm";


export default function page() {

 
    return (
        <div>
            <div className="flex gap-2">
                <ReturnToDash />
                <Link className={buttonVariants()} href={'/dashboard/bookings'}>View Bookings</Link>

            </div>
            <Suspense fallback={<LoadingForm/>}>
         <BookingForm/>
            </Suspense>

        </div>
    )
}