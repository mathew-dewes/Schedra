
import { BookingColumns } from "./_components/Bookingcolumn";
import { BookingTable } from "./_components/BookingTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry } from "@/lib/types/entries";
import ReturnToDash from "../_components/buttons/ReturnToDash";


export default async function page() {


  const bookings = await getBookings() as BookingEntry[];

  return (
    <div>
      <div className="flex gap-2">
       <ReturnToDash/>
        <Link className={buttonVariants()} href={'/dashboard/bookings/new'}>+ Add Booking</Link>

      </div>

      <BookingTable columns={BookingColumns} data={bookings} />
    </div>
  )
}