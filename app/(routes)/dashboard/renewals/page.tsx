import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { RenewalTable } from "./_components/tables/RenewalTable";
import { RenewalColumns } from "./_components/tables/RenewalColumns";
import { getRenewals } from "@/lib/db/queries/renewals";
import { RenewalEntry } from "@/lib/types/entries";
import ReturnToDash from "../_components/buttons/ReturnToDash";

export default async function page(){

  const renewals = await getRenewals() as RenewalEntry[];

    return (
          <div>
      <div className="flex gap-2">
       <ReturnToDash/>
        <Link className={buttonVariants()} href={'/dashboard/renewals/new'}>+ Add Renewal</Link>

      </div>

      <RenewalTable columns={RenewalColumns} data={renewals} />
    </div>
    )
}