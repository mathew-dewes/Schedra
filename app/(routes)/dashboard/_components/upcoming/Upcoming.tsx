
import { UpcomingBookings } from "./tables/UpcomingBookings";
import { UpcomingRenewals } from "./tables/UpcomingRenewals";

export default function Upcoming(){
    return (
        <div className="grid xl:grid-cols-2 lg:gap-5 gap-10 mt-10">
            <UpcomingRenewals/>
            <UpcomingBookings/>
        </div>
    )
}