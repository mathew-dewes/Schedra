import { VehicleStatusEnum } from "@/lib/types/enums";
import Vehicles from "./Vehicles";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/web/skeletons/SkeletonTable";


type Props = {
    searchParams: Promise<{
        status?: VehicleStatusEnum;

    }>;
};


export default async function page({
    searchParams,
}: Props) {

  const params = await searchParams;

  return (
    <Suspense fallback={<SkeletonTable/>}>
 <Vehicles params={params}/>
    </Suspense>

  )
}