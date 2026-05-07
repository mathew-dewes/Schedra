import { ArrowLeftIcon } from "lucide-react";
import RenewalForm from "./_components/RenewalForm";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getVehicles } from "@/lib/db/queries/vehicles";
import { VehicleType } from "@/lib/db/types";

export default async function page(){
     const userVehicles = await getVehicles() as VehicleType[];
      const vehicles = userVehicles.map((item) => {
        return {
            id: item.id,
            name: item.make + " " + item.model + " - " + item.plate_number
        }
    })
    return (
              <div>
            <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/renewals'}>View Renewals</Link>
        
            </div>
               <RenewalForm vehicles={vehicles}/>
        </div>
    )
}