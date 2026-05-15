
import { RenewalEntry } from "@/lib/types/entries";
import { addDays, isPast, isWithinInterval } from "date-fns";
import CriticalCard from "./CriticalCard";
import { TriangleAlert } from "lucide-react";

const now = new Date()


export default async function Critical({renewals, }:{
    renewals: RenewalEntry[]
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

 
    
    return (
        <div className="grid lg:grid-cols-2 gap-5">
            <CriticalCard
            icon={TriangleAlert} 
            title="Overdue" 
            description={`${overdue.length} Overdue Renewals`}
            renewals={overdue}
            cardType="overdue"
            disableLink={overdue.length == 0}
            hide={overdue.length == 0}
            />

            <CriticalCard  icon={TriangleAlert}  title="Due Soon" 
            description={`${dueSoon.length} Renewals Due This Week`}
            renewals={dueSoon}
            cardType="dueSoon"
            disableLink={dueSoon.length == 0}
            hide={dueSoon.length == 0}
            />

    
        </div>
    )
}