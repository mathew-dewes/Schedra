
import { BookingStatusEnum, BookingTypeEnum } from "@/lib/types/enums";
import Bookings from "./_components/Bookings";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/web/skeletons/SkeletonTable";


type Props = {
    searchParams: Promise<{
        status?: BookingStatusEnum;
        type?: BookingTypeEnum;
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