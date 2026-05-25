import Link from "next/link";
import ReturnToDash from "../../_components/buttons/ReturnToDash";
import { buttonVariants } from "@/components/ui/button";
import BookingFilters from "./BookingFilters";
import { BookingTable } from "./tables/BookingTable";
import { BookingColumns } from "./tables/Bookingcolumn";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingStatus, BookingType } from "@/lib/enums";
import { BookingTableData } from "@/lib/types";


type Props = {
    params: {
    status?: BookingStatus | undefined;
    type?: BookingType | undefined;
}
};



export default async function Bookings({params}: Props){

      const bookings = await getBookings(params) as BookingTableData[];
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