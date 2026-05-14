import Link from "next/link";
import ReturnToDash from "../../_components/buttons/ReturnToDash";
import { buttonVariants } from "@/components/ui/button";
import BookingFilters from "./BookingFilters";
import { BookingTable } from "./tables/BookingTable";
import { BookingColumns } from "./tables/Bookingcolumn";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry } from "@/lib/types/entries";


type Props = {
    params: {
    status?: "Scheduled" | "In progress" | "Completed" | undefined;
    type?: "Repairs" | "Servicing" | "Breakdown" | undefined;
}
};

export default async function Bookings({params}: Props){

      const bookings = await getBookings(params) as BookingEntry[];
    return (
         <div>
      <div className="flex gap-2">
        <ReturnToDash />
        <Link className={buttonVariants()} href={'/dashboard/bookings/new'}>+ Add Booking</Link>

      </div>
      <BookingFilters />
      <BookingTable columns={BookingColumns} data={bookings} />
    </div>
    )
}