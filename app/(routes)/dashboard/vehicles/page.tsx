
import { VehicleTable } from "./_components/tables/VehicleTable";
import { VehicleColumns } from "./_components/tables/VehicleColumns";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";





export default async function page() {


  const vehicles = await getVehicles() as VehicleType[];

  return (
    <div>
                            <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/vehicles/new'}>+ Add Vehicle</Link>
        
            </div>
    
      <VehicleTable columns={VehicleColumns} data={vehicles} />
    </div>
  )
}