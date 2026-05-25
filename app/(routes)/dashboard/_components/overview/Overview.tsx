
import { getRecentActivities } from "@/lib/db/queries/activities";
import { RecentActivity } from "./cards/RecentActivity";

import { OverviewChart } from "./OverviewChart";
import { getRenewalChartData } from "@/lib/db/queries/renewals";
import { Activity, RenewalChartEntry } from "@/lib/types";

export default async function Overview(){
    const [recentActivities, getChartData] = await Promise.all([getRecentActivities(), getRenewalChartData() ])

    const chartData = getChartData as RenewalChartEntry[];

    const renewalTotals = chartData.reduce(
  (acc, item) => {
    acc.WOF += item.WOF;
    acc.REGO += item.REGO;
    acc.RUC += item.RUC;
    acc.SERVICE += item.SERVICE;

    return acc;
  },
  { WOF: 0, REGO: 0, RUC: 0, SERVICE: 0 }
);

    return (
        <div className="grid xl:grid-cols-5 col-span-1 gap-5">
            <RecentActivity 
            activities={recentActivities as Activity[]}/>
            <OverviewChart renewalData={chartData as RenewalChartEntry[]} renewalTotals={renewalTotals}/>
          
        </div>
    )
}