
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity } from "@/lib/types";


import { formatDistanceToNow } from "date-fns";


type Props = {
  activities: Activity[]
}


export function RecentActivity({activities}: Props) {
  return (
    <Card className="xl:col-span-2 col-span-5 w-full">
      <CardHeader>
        <CardTitle className="text-center sm:text-left">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
 <Table>
      <TableCaption>A list of your recent activity.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Activity</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Vehicle</TableHead>
                 <TableHead className="text-right">Entered</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.activity}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.vehicle}</TableCell>
            <TableCell className="text-right">{formatDistanceToNow(row.time, { addSuffix: true })}</TableCell>
       
          </TableRow>
        ))}
      </TableBody>

    </Table>

      </CardContent>
    </Card>

   
  )
}
