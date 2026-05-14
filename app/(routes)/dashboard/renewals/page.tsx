import { RenewalStatusEnum, RenewalTypeEmum } from "@/lib/types/enums";
import Renewals from "./_components/Renewals";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/web/skeletons/SkeletonTable";


type Props = {
    searchParams: Promise<{
        status?: RenewalStatusEnum;
        type?: RenewalTypeEmum;
    }>;
};

export default async function page({
    searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <Suspense fallback={<SkeletonTable/>}>
    <Renewals params={params}/>
    </Suspense>

  )
}