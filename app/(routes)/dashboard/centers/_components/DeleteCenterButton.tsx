"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteCenter } from "@/lib/db/mutations/centers";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteCenterButton({center_id}:
    {center_id: string}
){
    const [isPending, startTransition] = useTransition();

    function handleDelete(){
        startTransition((async()=>{
            const res = await deleteCenter(center_id);
            
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