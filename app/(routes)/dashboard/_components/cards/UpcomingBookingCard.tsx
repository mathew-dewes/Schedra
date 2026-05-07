import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingBookingCard(){
    return(
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Total: 12</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-semibold">
                    <p>12 upcoming</p>
                    <p>Next: Tomorrow 9:00am</p>
                </div>

            </CardContent>
        </Card>
    )
}