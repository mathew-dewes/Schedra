
import { getServiceCenters } from "@/lib/db/queries/centers";
import { CenterColumns } from "./_components/tables/CenterColumns";
import { CenterTable } from "./_components/tables/CenterTable";
import { CenterType } from "@/lib/db/types";


export default async function page() {

  const centers = await getServiceCenters() as CenterType[];

  return (
    <div>
      <CenterTable columns={CenterColumns} data={centers} />
    </div>
  )
}