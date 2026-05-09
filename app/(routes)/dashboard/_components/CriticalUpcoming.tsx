import { getRenewals } from "@/lib/db/queries/renewals";
import Critical from "./critical/Critical";
import Upcoming from "./upcoming/Upcoming";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";

export default async function CriticalUpcoming() {

    const [renewals, bookings] = await Promise.all([getRenewals(), getBookings()])
    return (
        <div>
            <Critical 
            renewals={renewals as RenewalEntry[]} 
            bookings={bookings as BookingEntry[]} />
            <Upcoming 
            renewals={renewals as RenewalEntry[]} 
            bookings={bookings as BookingEntry[]} />
        </div>
    )
}