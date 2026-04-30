import { redirect } from "next/navigation";
import Welcome from "./_components/Welcome";
import KeyStats from "./_components/KeyStats";
import { ScheduleTable } from "./_components/ScheduleTable";
import Actions from "./_components/Actions";
import { UpcomingBookings } from "./_components/UpcomingBookings";
import { RecentActivity } from "./_components/RecentActivity";
import { checkActive } from "@/lib/db/queries/business";


export default async function page() {

    const isActive = await checkActive();

    console.log(isActive);
    

    if (!isActive) {
        redirect('/on-boarding');
    } else {
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


}