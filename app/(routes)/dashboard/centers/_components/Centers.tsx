import Link from "next/link";
import ReturnToDash from "../../_components/buttons/ReturnToDash";
import { buttonVariants } from "@/components/ui/button";
import { CenterTable } from "./tables/CenterTable";
import { CenterColumns } from "./tables/CenterColumns";
import { getServiceCenters } from "@/lib/db/queries/centers";
import { CenterTableData } from "@/lib/types";

export default async function Centers(){
      const centers = await getServiceCenters() as CenterTableData[];
    return(
          <div>
                            <div className="flex gap-2">
<ReturnToDash/>
<Link className={buttonVariants()} href={'/dashboard/centers/new'}>+ Add Service Center</Link>
        
            </div>

      <CenterTable columns={CenterColumns} data={centers} />
    </div>
    )
}