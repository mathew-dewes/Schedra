import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { LucideIcon } from "lucide-react";

type CardType = "overdue" | "dueSoon" | "activeBreakdown";

type Props = {
    title: string,
    description: string,
    renewals?: RenewalEntry[],
    bookings?: BookingEntry[],
    icon: LucideIcon,
    cardType: CardType,
    spanFull?: boolean,
    hide?: boolean
};


export default function CriticalCard({
    title,
    description,
    renewals,
    bookings,
    icon: Icon,
    cardType,
    spanFull = false,
    hide = false
}: Props) {
    return (
        <Card hidden={hide} className={cn(`w-full ${spanFull && "col-span-2"}`)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-1">
                    {Icon && <Icon size={18}
                        className={cn(`mb-1 ${cardType == "overdue" ? "text-red-400" : "text-orange-400"}`)} />}{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Separator />
                    {renewals?.map((renewal) => (
                        <div className="space-y-1" key={renewal.id}>
                            <p className="font-semibold">{renewal.type}</p>
                            <p className="text-muted-foreground">Due: {format(renewal.dueDate, "dd/MM/yy")} - {formatDistanceToNow(renewal.dueDate, { addSuffix: true })}</p>
                            <p>{renewal.vehicle} {renewal.vehicle_plate}</p>
                            <Separator />
                        </div>
                    ))}
                    {bookings?.map((booking) => (
                        <div className="space-y-1" key={booking.id}>
                            <p className="font-semibold">{booking.vehicle} - {booking.plate_number}</p>
                            <div className="flex gap-5">
                                <p>Since: {format(booking.bookingDate, "dd/MM/yy")} - {formatDistanceToNow(booking.bookingDate, { addSuffix: true })}</p>
                                <p>Repair location: {booking.center}</p>

                            </div>
                            <Separator />
                        </div>
                    ))}
                </div>


            </CardContent>
        </Card>
    )
}