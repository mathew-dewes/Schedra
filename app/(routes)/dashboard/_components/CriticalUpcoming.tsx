import { getRenewals } from "@/lib/db/queries/renewals";
import Critical from "./critical/Critical";
import Upcoming from "./upcoming/Upcoming";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";

export default async function CriticalUpcoming() {

    const [fetchedRenewals, fetchedBookings] = await Promise.all([getRenewals(), getBookings()])
    
    const renewals = fetchedRenewals as RenewalEntry[];
    const bookings = fetchedBookings as BookingEntry[];
    return (
        <div>
          
             <Critical 
            renewals={renewals} />
           
            <Upcoming 
            renewals={renewals} 
            bookings={bookings} />
        </div>
    )
}