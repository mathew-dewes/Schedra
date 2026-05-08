
import { BookingEntry, RenewalEntry } from "@/lib/types/entries";
import { addDays, isPast, isWithinInterval } from "date-fns";
import CriticalCard from "./CriticalCard";

const now = new Date()


export default async function Critical({renewals, bookings}:{
    renewals: RenewalEntry[], bookings: BookingEntry[]
}){

    const overdue = renewals.filter((renewal)=>{
        return isPast(renewal.dueDate)
    });

    const dueSoon = renewals.filter((renewal)=>{
        return isWithinInterval(renewal.dueDate,
            {start: now,
            end: addDays(now, 7)
            }
        )
    });

    const breakDowns = bookings.filter((booking)=>{
        return booking.booking_type == "Breakdown"
    })


    
    return (
        <div className="grid grid-cols-2 gap-5">
            <CriticalCard 
            title="Overdue" 
            description={`${overdue.length} Overdue Renewals`}
            renewals={overdue}
            />

            <CriticalCard title="Due Soon" 
            description={`${dueSoon.length} Renewals Due This Week`}
            renewals={dueSoon}/>

            <CriticalCard title="Active breakdowns" 
            description={`${breakDowns.length} active breakdowns`}/>
  
        </div>
    )
}