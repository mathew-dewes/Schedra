
import { VehicleTable } from "./_components/tables/VehicleTable";
import { VehicleColumns } from "./_components/tables/VehicleColumns";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";





export default async function page() {


  const vehicles = await getVehicles() as VehicleType[];
  
  return (
    <div className="container mx-auto">
      <VehicleTable columns={VehicleColumns} data={vehicles} />
    </div>
  )
}