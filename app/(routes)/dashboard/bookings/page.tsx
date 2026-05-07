
import { BookingColumns } from "./_components/Bookingcolumn";
import { BookingTable } from "./_components/BookingTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingType } from "@/lib/db/types";


export default async function page() {


  const bookings = await getBookings() as BookingType[];

  return (
    <div>
      <div className="flex gap-2">
        <Link className={buttonVariants({ variant: "secondary" })} href={'/dashboard'}><ArrowLeftIcon /></Link>
        <Link className={buttonVariants()} href={'/dashboard/bookings/new'}>+ Add Booking</Link>

      </div>

      <BookingTable columns={BookingColumns} data={bookings} />
    </div>
  )
}