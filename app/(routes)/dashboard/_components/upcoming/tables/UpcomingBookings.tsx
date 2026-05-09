import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BookingEntry } from "@/lib/types/entries"
import { format } from "date-fns"
import Link from "next/link"

export function UpcomingBookings({bookings}:
  {bookings: BookingEntry[]}
) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
               
    
 <Table>
      <TableCaption>A list of your upcoming bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Center</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead className="text-right">REGO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{format(booking.bookingDate, "dd/MM/yy")}</TableCell>
            <TableCell className="font-medium">{booking.booking_type}</TableCell>
            <TableCell className="font-medium">{booking.center}</TableCell>
            <TableCell className="font-medium">{booking.vehicle}</TableCell>
            <TableCell className="text-right">{booking.plate_number}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  
        </CardContent>
         <CardFooter>
          <Link className={buttonVariants()} href={'/dashboard/bookings'}>View all bookings</Link>
        </CardFooter>

    </Card>

   
  )
}
