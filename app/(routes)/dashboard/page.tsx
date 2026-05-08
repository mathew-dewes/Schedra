
import { Suspense } from "react";
import Actions from "./_components/Actions";
import CriticalUpcoming from "./_components/CriticalUpcoming";
import Overview from "./_components/overview/Overview";

export default function page() {
    return (
        <div className="space-y-10">
                   <Actions />
                   <Suspense fallback={"Loading data"}>
                    <CriticalUpcoming/>
                   </Suspense>
          
                   <Overview />
               </div>

    )




}