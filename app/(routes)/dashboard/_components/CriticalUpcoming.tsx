import { getRenewals } from "@/lib/db/queries/renewals";
import Critical from "./critical/Critical";
import Upcoming from "./upcoming/Upcoming";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";

export default async function CriticalUpcoming() {
    const renewals = await getRenewals() as RenewalEntry[];
    const bookings = await getBookings() as BookingEntry[];
    return (
        <div>
            <Critical renewals={renewals} bookings={bookings} />
            <Upcoming />
        </div>
    )
}