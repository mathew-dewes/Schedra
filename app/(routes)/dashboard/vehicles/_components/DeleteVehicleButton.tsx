"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteVehicle } from "@/lib/db/mutations/vehicles";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteVehicleButton({vehicle_id}:
    {vehicle_id: string}
){
    const [isPending, startTransition] = useTransition();

    function handleDelete(){
        startTransition((async()=>{
            const res = await deleteVehicle(vehicle_id);
            
            if (!res.message){
                toast.error(res.message)
            } else {
                toast.success(res.message)
            }
        }))
    }
return (
    <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
        Delete vehicle
    </DropdownMenuItem>
)
}