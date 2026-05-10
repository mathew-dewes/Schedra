import Link from "next/link";
import VehicleForm from "./_components/VehicleForm";
import { buttonVariants } from "@/components/ui/button";
import ReturnToDash from "../../_components/buttons/ReturnToDash";

export default function page(){
    return (
        <div>
<div className="flex gap-2">
 <ReturnToDash/>
<Link className={buttonVariants()} href={'/dashboard/vehicles'}>View Vehicles</Link>
        
            </div>

            <VehicleForm/>
        </div>
    )
}