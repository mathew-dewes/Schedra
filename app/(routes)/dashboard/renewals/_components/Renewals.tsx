import Link from "next/link";
import ReturnToDash from "../../_components/buttons/ReturnToDash";
import { buttonVariants } from "@/components/ui/button";
import RenewalFilters from "./RenewalFilters";
import { RenewalTable } from "./tables/RenewalTable";
import { RenewalColumns } from "./tables/RenewalColumns";
import { getRenewals } from "@/lib/db/queries/renewals";
import { RenewalEntry } from "@/lib/types";

type Props = {
   params: {
    status?: "Completed" | "Upcoming" | "Due Soon" | "Overdue" | undefined;
    type?: "Warrant of fitness" | "Registration" | "Road user charge" | "Service" | undefined;
}
};

export default async function Renewals({params}: Props){
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