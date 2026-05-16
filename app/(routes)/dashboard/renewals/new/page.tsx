
import { Suspense } from "react";
import { LoadingForm } from "@/components/web/skeletons/LoadingForm";
import ReturnToDash from "../../_components/buttons/ReturnToDash";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import RenewalForm from "./_components/RenewalForm";

export default async function page() {

    return (
        <div>
         <div className="flex gap-2">
                <ReturnToDash />
                <Link className={buttonVariants()} href={'/dashboard/renewals'}>View Renewals</Link>

            </div>

      <Suspense fallback={<LoadingForm />}>
    <RenewalForm/>
        </Suspense>
   
        </div>
     
  
  
    )
}