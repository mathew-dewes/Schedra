import Welcome from "./_components/Welcome";
import KeyStats from "./_components/KeyStats";
import { ScheduleTable } from "./_components/ScheduleTable";
import Actions from "./_components/Actions";
import { UpcomingBookings } from "./_components/UpcomingBookings";
import { RecentActivity } from "./_components/RecentActivity";


export default async function page() {


        return (
            <div className="space-y-10">
                <Welcome />
                <Actions />
                <KeyStats />
                <div className="grid grid-cols-2 gap-20">
                    <ScheduleTable />
                    <UpcomingBookings />
                </div>
                <RecentActivity />



            </div>
        )

    


}