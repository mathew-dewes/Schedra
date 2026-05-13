"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteRenewal } from "@/lib/db/mutations/renewals";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteRenewalButton({renewal_id}:
    {renewal_id: string}
){
    const [isPending, startTransition] = useTransition();

    function handleDelete(){
        startTransition((async()=>{
            const res = await deleteRenewal(renewal_id);
            
            if (!res.message){
                toast.error(res.message)
            } else {
                toast.success(res.message)
            }
        }))
    }
return (
    <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
        Delete renewal
    </DropdownMenuItem>
)
}