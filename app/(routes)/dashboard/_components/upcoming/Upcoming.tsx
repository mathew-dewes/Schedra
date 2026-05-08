
import { UpcomingBookings } from "./tables/UpcomingBookings";
import { UpcomingRenewals } from "./tables/UpcomingRenewals";

export default function Upcoming(){
    return (
        <div className="grid lg:grid-cols-2 gap-5">
            <UpcomingRenewals/>
            <UpcomingBookings/>
        </div>
    )
}