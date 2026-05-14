
import { Suspense } from "react";
import Centers from "./_components/Centers";
import { SkeletonTable } from "@/components/web/skeletons/SkeletonTable";


export default function page() {


  return (
    <Suspense fallback={<SkeletonTable/>}>
<Centers/>
    </Suspense>

  )
}