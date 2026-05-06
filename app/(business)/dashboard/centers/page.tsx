
import { getServiceCenters } from "@/lib/db/queries/centers";
import { CenterColumns } from "./_components/tables/CenterColumns";
import { CenterTable } from "./_components/tables/CenterTable";
import { CenterType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


export default async function page() {

  const centers = await getServiceCenters() as CenterType[];

  return (
    <div>
       <Link className={buttonVariants({ size: "sm" })} href={'/dashboard/centers/new'}>+ Add Center</Link>
      <CenterTable columns={CenterColumns} data={centers} />
    </div>
  )
}