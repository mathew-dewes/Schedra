
import { getRecentActivities } from "@/lib/db/queries/activities";
import { RecentActivity } from "./cards/RecentActivity";

import { Activity, RenewalChartEntry } from "@/lib/types";
import { OverviewChart } from "./OverviewChart";
import { getRenewalChartData } from "@/lib/db/queries/renewals";

export default async function Overview(){
    const [recentActivities, chartData] = await Promise.all([getRecentActivities(), getRenewalChartData() ])
    return (
        <div className="grid xl:grid-cols-5 col-span-1 gap-5">
            <RecentActivity 
            activities={recentActivities as Activity[]}/>
            <OverviewChart renewalData={chartData as RenewalChartEntry[]}/>
          
        </div>
    )
}