"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { BookingEntry } from "@/lib/types/entries"
import { BOOKING_STATUSES, bookingStatusStyles } from "@/lib/constants"
import BookingStatusChanger from "../BookingStatusChanger"
import DeleteBookingButton from "../DeleteBookingButton"




export const BookingColumns: ColumnDef<BookingEntry>[] = [
  {
    accessorKey: "bookingDate",
    header: "Date",
    cell:({row})=>{
      return <div>{format(row.original.bookingDate, "dd/MM/yy") }</div>
    }
  
  },
    {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  
  {
    accessorKey: "plant",
    header: "Plant",
  },
  {
    accessorKey: "plate_number",
    header: "REGO",
  },
        {
    accessorKey: "center",
    header: "Center",
  },

      {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
return <div className="flex w-fit items-center gap-2 p-1.5">
  <div className={cn(bookingStatusStyles[row.original.status], "size-4 rounded-full")}/>
  <p>{row.original.status}</p>
</div>
    }
  },
      {
      
    id: "actions",
     header: () => <div className="text-right mr-2">Actions</div>,
    cell: ({ row }) => {
      const booking = row.original
 
      return (
        <div className="flex justify-end mr-2">
<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(booking.center_email)}
            >
              Copy center email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {BOOKING_STATUSES.map((status)=>{
            if (status == booking.status) return
            return <BookingStatusChanger key={status} status={status} booking_id={booking.id}/>
            })}
                    <DropdownMenuSeparator />
           <DeleteBookingButton booking_id={booking.id}/>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
      )
    },
  },
]