import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RenewalEntry } from "@/lib/types/entries";
import { format, formatDistanceToNow } from "date-fns";

export default function CriticalCard({ title, description, renewals }: {
    title: string, description: string, renewals?: RenewalEntry[]
}) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
     {renewals?.map((renewal) => (
                    <div key={renewal.id}>
                        <p className="font-semibold">{renewal.type}</p>
                        <p>{renewal.vehicle} {renewal.vehicle_plate}</p>
                        <p>Due: {format(renewal.dueDate, "dd/MM/yy")} - {formatDistanceToNow(renewal.dueDate, {addSuffix: true})}</p>
                    </div>
                ))}
                </div>
           

            </CardContent>
        </Card>
    )
}