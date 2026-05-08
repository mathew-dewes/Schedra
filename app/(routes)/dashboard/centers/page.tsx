
import { getServiceCenters } from "@/lib/db/queries/centers";
import { CenterColumns } from "./_components/tables/CenterColumns";
import { CenterTable } from "./_components/tables/CenterTable";
import { CenterType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReturnToDash from "../_components/buttons/ReturnToDash";


export default async function page() {

  const centers = await getServiceCenters() as CenterType[];

  return (
    <div>
                            <div className="flex gap-2">
<ReturnToDash/>
<Link className={buttonVariants()} href={'/dashboard/centers/new'}>+ Add Service Center</Link>
        
            </div>

      <CenterTable columns={CenterColumns} data={centers} />
    </div>
  )
}