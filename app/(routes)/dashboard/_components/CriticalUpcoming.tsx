import { getRecentRenewals } from "@/lib/db/queries/renewals";
import Critical from "./critical/Critical";
import Upcoming from "./upcoming/Upcoming";
import { getUpcomingBookings } from "@/lib/db/queries/bookings";
import { BookingStatus, BookingType, RenewalType } from "@/lib/enums";



export type UpcomingRenewal = {
    id: string;
    dueDate: Date;
    type: RenewalType;
    vehicle: string;
    plant: string;
    status: string;
    vehicle_plate: string;
};

export type UpcomingBooking = {
    id: string;
    title: string;
    status: BookingStatus;
    bookingDate: Date;
    center: string | undefined;
    center_email: string | undefined;
    plant: string;
    vehicle: string;
    plate_number: string;
    type: BookingType
}


export default async function CriticalUpcoming() {

    const [fetchedRenewals, fetchedBookings] = await Promise.all([getRecentRenewals(), getUpcomingBookings()])
    
    const renewals = fetchedRenewals as UpcomingRenewal[];
    const bookings = fetchedBookings as UpcomingBooking[];
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