
import { getRecentActivities } from "@/lib/db/queries/activities";
import { RecentActivity } from "./cards/RecentActivity";
import { FleetStatusChart } from "./FleetStatusChart";
import { Activity } from "@/lib/types";
import { getVehicleStatusTotals } from "@/lib/db/queries/vehicles";

export default async function Overview(){
const [recentActivities, totals] = await Promise.all([getRecentActivities(), getVehicleStatusTotals()])

    return (
        <div className="grid xl:grid-cols-3 gap-5">
            <RecentActivity 
            activities={recentActivities as Activity[]}/>
            <FleetStatusChart data={totals as { status: string; total: number}[]}/>
        </div>
    )
}