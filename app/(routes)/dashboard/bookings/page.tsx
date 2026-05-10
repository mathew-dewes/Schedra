
import { BookingColumns } from "./_components/Bookingcolumn";
import { BookingTable } from "./_components/BookingTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry } from "@/lib/types/entries";
import ReturnToDash from "../_components/buttons/ReturnToDash";
import BookingFilters from "./_components/BookingFilters";
import { BookingStatusEnum, BookingTypeEnum } from "@/lib/types/enums";


type Props = {
    searchParams: Promise<{
        status?: BookingStatusEnum;
        type?: BookingTypeEnum;
    }>;
};

export default async function page({
    searchParams,
}: Props) {

  const params = await searchParams;
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