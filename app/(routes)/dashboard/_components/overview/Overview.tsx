import { RecentActivity } from "./cards/RecentActivity";
import { FleetStatusChart } from "./FleetStatusChart";

export default function Overview(){
    return (
        <div className="grid grid-cols-2 gap-5">
            <RecentActivity/>
            <FleetStatusChart/>
        </div>
    )
}