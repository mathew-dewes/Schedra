"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { changeVehicleStatus } from "@/lib/db/mutations/vehicles";
import { VehicleStatusEnum } from "@/lib/types/enums";
import { useTransition } from "react";
import { toast } from "sonner"

export default function VehicleStatusChanger({vehicle_id ,status}:
    {vehicle_id: string, status: VehicleStatusEnum}
){
const [isPending, startTransition] = useTransition()

function handleUpdate(){
    startTransition((async()=>{
    const res = await changeVehicleStatus(vehicle_id ,status);

    if (!res.success){
        toast.error(res.message)
    } else {
        toast.success(res.message)
    }
    }))
}


return (
          <DropdownMenuItem 
          disabled={isPending} 
          onClick={handleUpdate}>Set {status}</DropdownMenuItem>
    )
}