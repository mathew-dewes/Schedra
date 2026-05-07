import ActiveServicesCard from "./cards/ActiveServicesCard";
import CustomerCard from "./cards/CustomerCard";
import TodaysBookingCard from "./cards/TodaysBookingCard";
import UpcomingBookingCard from "./cards/UpcomingBookingCard";

export default function KeyStats(){
    
    return (
        <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-3">
            <TodaysBookingCard/>
            <UpcomingBookingCard/>
            <ActiveServicesCard/>
            <CustomerCard/>
        </div>
    )
}