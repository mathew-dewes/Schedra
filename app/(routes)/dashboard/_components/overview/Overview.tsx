
import { getRecentActivities } from "@/lib/db/queries/activities";
import { RecentActivity } from "./cards/RecentActivity";
import { FleetStatusChart } from "./FleetStatusChart";
import { Activity } from "@/lib/types";

export default async function Overview(){

    const recentActivities = await getRecentActivities() as Activity[];

    return (
        <div className="grid xl:grid-cols-3 gap-5">
            <RecentActivity activities={recentActivities}/>
            <FleetStatusChart/>
        </div>
    )
}