

import Bookings from "./_components/Bookings";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/web/skeletons/SkeletonTable";
import { BookingStatus } from "@/lib/enums";


type Props = {
    searchParams: Promise<{
        status?: BookingStatus;
    }>;
};

export default async function page({
    searchParams,
}: Props) {

  const params = await searchParams;

  return (
 
    <Suspense fallback={<SkeletonTable/>}>
    <Bookings params={params}/>
    </Suspense>
  


  )
}