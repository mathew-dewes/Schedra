
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";
import { UpcomingBookings } from "./tables/UpcomingBookings";
import { UpcomingRenewals } from "./tables/UpcomingRenewals";

export default function Upcoming({renewals, bookings}:{
    renewals: RenewalEntry[], bookings: BookingEntry[]
}){
    return (
        <div className="grid xl:grid-cols-2 lg:gap-5 gap-10 mt-10">
            <UpcomingRenewals renewals={renewals}/>
            <UpcomingBookings bookings={bookings}/>
        </div>
    )
}