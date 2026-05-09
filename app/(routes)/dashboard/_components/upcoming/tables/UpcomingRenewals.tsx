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
import { RenewalEntry } from "@/lib/types/entries"
import { addDays, format, isPast, isWithinInterval } from "date-fns"
import Link from "next/link"

export function UpcomingRenewals({renewals}:
  {renewals: RenewalEntry[]}
) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Upcoming Renewals</CardTitle>
        </CardHeader>
        <CardContent>
               
    
 <Table>
      <TableCaption>A list of your upcoming renewals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Due Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead className="text-right">REGO</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {renewals.map((renewal) => (
          <TableRow key={renewal.id}>
              <TableCell className="font-medium flex items-center gap-1">
                {format(renewal.dueDate, "dd/MM/yy")}
                <div hidden={!isPast(renewal.dueDate)} className="bg-red-500 size-2 rounded-full"/>
                <div hidden={!isWithinInterval(renewal.dueDate, {
                  start: new Date(),
                  end: addDays(new Date(), 7)
                })} className="bg-orange-500 size-2 rounded-full"/>
              
                </TableCell>
            <TableCell className="font-medium">{renewal.type}</TableCell>
            <TableCell className="font-medium">{renewal.vehicle}</TableCell>
            <TableCell className="font-medium text-right">{renewal.vehicle_plate}</TableCell>
      
          </TableRow>
        ))}
      </TableBody>

    </Table>
  
        </CardContent>
        <CardFooter>
          <Link className={buttonVariants()} href={'/dashboard/renewals'}>View all renewals</Link>
        </CardFooter>

    </Card>

   
  )
}
