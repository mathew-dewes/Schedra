
import { Suspense } from "react";
import Actions from "./_components/Actions";
import CriticalUpcoming from "./_components/CriticalUpcoming";
import Overview from "./_components/overview/Overview";
import CriticalUpcomingSkeleton from "@/components/web/skeletons/CriticalUpcomingSkeleton";

export default function page() {
    return (
        <div className="space-y-10">
            <Actions />
            <Suspense fallback={<CriticalUpcomingSkeleton/>}>
                <CriticalUpcoming />
            </Suspense>

            <Suspense fallback="Loading data...">
                <Overview />
            </Suspense>


        </div>

    )




}