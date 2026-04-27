import { Suspense } from "react";
import ServiceSetup from "./_components/ServiceSetup";

export default function page(){
    return (
        <div>
            <Suspense fallback="Loading data...">
      <ServiceSetup/>
            </Suspense>
      
        </div>
    )
}