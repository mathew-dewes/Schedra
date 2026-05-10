
import { Button } from "@/components/ui/button";
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
import { ACTIVITY_LABELS } from "@/lib/constants";
import { Activity } from "@/lib/types";


import { formatDistanceToNow } from "date-fns";


type Props = {
  activities: Activity[]
}


export function RecentActivity({activities}: Props) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
 <Table>
      <TableCaption>A list of your recent activity.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Activity</TableHead>
          <TableHead>Vehicle</TableHead>
          <TableHead>Time</TableHead>
                 <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{ACTIVITY_LABELS[row.activity]}</TableCell>
            <TableCell>{row.vehicle}</TableCell>
            <TableCell>{formatDistanceToNow(row.time, { addSuffix: true })}</TableCell>
             <TableCell className="text-right">
              <Button size={"sm"}>View</Button>
             </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>

      </CardContent>
    </Card>

   
  )
}
