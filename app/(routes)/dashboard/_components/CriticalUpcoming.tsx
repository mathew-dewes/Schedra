import { getRenewals } from "@/lib/db/queries/renewals";
import Critical from "./critical/Critical";
import Upcoming from "./upcoming/Upcoming";
import { getBookings } from "@/lib/db/queries/bookings";
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";
import { RenewalStatusEnum } from "@/lib/types/enums";

export default async function CriticalUpcoming() {

    const [fetchedRenewals, fetchedBookings] = await Promise.all([getRenewals(), getBookings()])
    
    const renewals = fetchedRenewals as RenewalEntry[];
    const bookings = fetchedBookings as BookingEntry[];

    const criticalStatues = ["Due Soon", "Overdue"] as RenewalStatusEnum[];
    const isCritial = renewals.some((entry)=>{
        return criticalStatues.includes(entry.status)
    });

 

    return (
        <div>
            {!isCritial ? <p>You have no critical renewals at this time, Well done!</p> : 
             <Critical 
            renewals={renewals} />}
           
            <Upcoming 
            renewals={renewals} 
            bookings={bookings} />
        </div>
    )
}