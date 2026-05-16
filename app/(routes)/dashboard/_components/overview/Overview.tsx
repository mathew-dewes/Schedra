
import { getRecentActivities } from "@/lib/db/queries/activities";
import { RecentActivity } from "./cards/RecentActivity";

import { Activity } from "@/lib/types";
import { OverviewChart } from "./OverviewChart";

export default async function Overview(){
const recentActivities = await getRecentActivities();

    return (
        <div className="grid xl:grid-cols-5 col-span-1 gap-5">
            <RecentActivity 
            activities={recentActivities as Activity[]}/>
            <OverviewChart/>
          
        </div>
    )
}