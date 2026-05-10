
import { VehicleTable } from "./_components/tables/VehicleTable";
import { VehicleColumns } from "./_components/tables/VehicleColumns";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReturnToDash from "../_components/buttons/ReturnToDash";
import VehicleFilters from "./_components/VehicleFilters";
import { VehicleStatusEnum } from "@/lib/types/enums";


type Props = {
    searchParams: Promise<{
        status?: VehicleStatusEnum;

    }>;
};


export default async function page({
    searchParams,
}: Props) {

  const params = await searchParams;
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