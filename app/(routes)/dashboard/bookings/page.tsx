import { BookingColumn } from "@/lib/types/tableColumns";
import { BookingColumns } from "./_components/Bookingcolumn";
import { BookingTable } from "./_components/BookingTable";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";


async function getData(): Promise<BookingColumn[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
      customer: "Mathew Dewes",
      service: "Lawn mowing",
      bookingDate: new Date(),
      bookingTime: new Date(),
      address: "123 Bob Street, Auckland",
      phone: "0210383716"
    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
      customer: "Elon Musk",
      service: "Lawn mowing",
      bookingDate: new Date(),
      bookingTime: new Date(),
      address: "123 Bob Street, Auckland",
      phone: "0210383716"

    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
      customer: "Donald Trump",
      service: "Lawn mowing",
      bookingDate: new Date(),
      bookingTime: new Date(),
      address: "123 Bob Street, Auckland",
      phone: "0210383716"
    },
    {
      id: "728ed52f",
      status: "pending",
      email: "m@example.com",
      customer: "Bob Marley",
      service: "Lawn mowing",
      bookingDate: new Date(),
      bookingTime: new Date(),
      address: "123 Bob Street, Auckland",
      phone: "0210383716"
    },
    // ...
  ]
}

export default async function page() {

  const data = await getData()
  return (
    <div>
      <Link className={buttonVariants({ size: "sm" })} href={'/dashboard/bookings/new'}>+ Add Booking</Link>
      <BookingTable columns={BookingColumns} data={data} />
    </div>
  )
}