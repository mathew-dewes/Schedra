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

import { format } from "date-fns"
import Link from "next/link"
import { UpcomingBooking } from "../../CriticalUpcoming"

export function UpcomingBookings({bookings}:
  {bookings: UpcomingBooking[]}
) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-center sm:text-left">Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
               
    
 <Table>
      <TableCaption>
         {bookings.length == 0 ? "You have no bookings." : "A list of your upcoming renewals."}
      </TableCaption>
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
            <TableCell className="font-medium">{booking.type}</TableCell>
            <TableCell className="font-medium">{booking.center}</TableCell>
            <TableCell className="font-medium">{booking.vehicle}</TableCell>
            <TableCell className="text-right">{booking.plate_number}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  
        </CardContent>
         <CardFooter hidden={bookings.length == 0}>
          <Link className={buttonVariants()} href={'/dashboard/bookings'}>View all bookings</Link>
        </CardFooter>

    </Card>

   
  )
}
