"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { changeBookingStatus } from "@/lib/db/mutations/bookings";
import { BookingStatusEnum } from "@/lib/types/enums";
import { useTransition } from "react";
import { toast } from "sonner"

export default function BookingStatusChanger({booking_id ,status}:
    {booking_id: string, status: BookingStatusEnum}
){

function handleUpdate(){
    startTransition((async()=>{
    const res = await changeBookingStatus(booking_id ,status);

    if (!res.success){
        toast.error(res.message)
    } else {
        toast.success(res.message)
    }
    }))
}

const [isPending, startTransition] = useTransition()
    return (
          <DropdownMenuItem 
          disabled={isPending} 
          onClick={handleUpdate}>Set {status}</DropdownMenuItem>
    )
}