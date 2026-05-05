
import { getServiceCenters } from "@/lib/db/queries/centers";
import { ProviderColumns } from "./_components/tables/ProviderColumns";
import { ProviderTable } from "./_components/tables/ProviderTable";
import { CenterType } from "@/lib/db/types";


export default async function page(){

  const centers = await getServiceCenters() as CenterType[];

    return (
       <div>
      <ProviderTable columns={ProviderColumns} data={centers} />
    </div>
    )
}