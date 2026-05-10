import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { RenewalTable } from "./_components/tables/RenewalTable";
import { RenewalColumns } from "./_components/tables/RenewalColumns";
import { getRenewals } from "@/lib/db/queries/renewals";
import { RenewalEntry } from "@/lib/types/entries";
import ReturnToDash from "../_components/buttons/ReturnToDash";
import RenewalFilters from "./_components/RenewalFilters";
import { RenewalStatusEnum, RenewalTypeEmum } from "@/lib/types/enums";


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
  const renewals = await getRenewals(params) as RenewalEntry[];

  return (
    <div>
      <div className="flex gap-2">
        <ReturnToDash />
        <Link className={buttonVariants()} href={'/dashboard/renewals/new'}>+ Add Renewal</Link>

      </div>
      <RenewalFilters />
      <RenewalTable columns={RenewalColumns} data={renewals} />
    </div>
  )
}