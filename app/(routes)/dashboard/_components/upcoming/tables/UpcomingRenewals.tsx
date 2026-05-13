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
import { renewalStatusStyles } from "@/lib/constants"
import { RenewalEntry } from "@/lib/types/entries"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"

export function UpcomingRenewals({ renewals }:
  { renewals: RenewalEntry[] }
) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center sm:text-left">Upcoming Renewals</CardTitle>
      </CardHeader>
      <CardContent>


        <Table>
          <TableCaption>
            {renewals.length == 0 ? "You have no renewals." : "A list of your upcoming renewals."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Due Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead className="text-right">REGO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renewals.map((renewal) => {

              return <TableRow key={renewal.id}>
                <TableCell className="font-medium">
                  {format(renewal.dueDate, "dd/MM/yy")}
                </TableCell>
                <TableCell className="font-medium">{renewal.type}</TableCell>
                         <TableCell className="font-medium flex items-center gap-1.5">
                  <div className={cn(renewalStatusStyles[renewal.status], "size-3 rounded-full")}/>
                  {renewal.status}
                   </TableCell>
                <TableCell className="font-medium">{renewal.vehicle}</TableCell>
       
                <TableCell className="font-medium text-right">{renewal.vehicle_plate}</TableCell>

              </TableRow>
            }

            )}
          </TableBody>

        </Table>

      </CardContent>
      <CardFooter hidden={renewals.length == 0}>
        <Link className={buttonVariants()} href={'/dashboard/renewals'}>View renewals</Link>
      </CardFooter>

    </Card>


  )
}
