import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TodaysBookingCard(){
    return(
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Today&apos;s Bookings</CardTitle>
                <CardDescription>Total: 12</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-semibold">
                    <p>8 bookings today</p>
                    <p>Next at 10:30am - Bob</p>
                </div>

            </CardContent>
        </Card>
    )
}