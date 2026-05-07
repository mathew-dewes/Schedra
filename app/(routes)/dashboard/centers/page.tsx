
import { getServiceCenters } from "@/lib/db/queries/centers";
import { CenterColumns } from "./_components/tables/CenterColumns";
import { CenterTable } from "./_components/tables/CenterTable";
import { CenterType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";


export default async function page() {

  const centers = await getServiceCenters() as CenterType[];

  return (
    <div>
                            <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/centers/new'}>+ Add Service Center</Link>
        
            </div>

      <CenterTable columns={CenterColumns} data={centers} />
    </div>
  )
}