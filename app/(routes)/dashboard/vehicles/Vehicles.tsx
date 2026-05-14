import Link from "next/link";
import ReturnToDash from "../_components/buttons/ReturnToDash";
import { buttonVariants } from "@/components/ui/button";
import VehicleFilters from "./_components/VehicleFilters";
import { VehicleTable } from "./_components/tables/VehicleTable";
import { VehicleColumns } from "./_components/tables/VehicleColumns";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";

type Props = {
    params: {
    status?: "Available" | "In service" | "Out of service" | "Under maintenance" | undefined;
}
}

export default async function Vehicles({params}: Props){
      const vehicles = await getVehicles(params) as VehicleType[];
    return (
            <div>
      <div className="flex gap-2">
        <ReturnToDash />
        <Link className={buttonVariants()} href={'/dashboard/vehicles/new'}>+ Add Vehicle</Link>

      </div>
<VehicleFilters/>
      <VehicleTable columns={VehicleColumns} data={vehicles} />
    </div>
    )
}