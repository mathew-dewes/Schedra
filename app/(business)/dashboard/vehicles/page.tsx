
import { VehicleTable } from "./_components/tables/VehicleTable";
import { VehicleColumns } from "./_components/tables/VehicleColumns";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";





export default async function page() {


  const vehicles = await getVehicles() as VehicleType[];

  return (
    <div>
      <Link className={buttonVariants({ size: "sm" })} href={'/dashboard/vehicles/new'}>+ Add Vehicle</Link>
      <VehicleTable columns={VehicleColumns} data={vehicles} />
    </div>
  )
}