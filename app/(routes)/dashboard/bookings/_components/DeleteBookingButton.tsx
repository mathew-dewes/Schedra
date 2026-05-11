"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteBooking } from "@/lib/db/mutations/bookings";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteBookingButton({booking_id}:
    {booking_id: string}
){
    const [isPending, startTransition] = useTransition();

    function handleDelete(){
        startTransition((async()=>{
            const res = await deleteBooking(booking_id);
            
            if (!res.message){
                toast.error(res.message)
            } else {
                toast.success(res.message)
            }
        }))
    }
return (
    <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
        Delete booking
    </DropdownMenuItem>
)
}