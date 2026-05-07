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
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { BookingStatus, BookingType } from "@/lib/db/types"
import { cn } from "@/lib/utils"


const bookingStatusStyles: Record<BookingStatus, string> = {
  Scheduled: "bg-blue-400",
  "In progress": "bg-orange-400 text-black",
  Completed: "bg-green-400",
  Cancelled: "bg-red-400",
}

export const BookingColumns: ColumnDef<BookingType>[] = [
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "category",
    header: "Category",
    cell:({row})=>{
      return <Badge variant={"secondary"} >{row.original.category}</Badge>

    }
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
    accessorKey: "center",
    header: "Center",
  },

      {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
return <div className="flex w-fit bg-secondary items-center gap-2 p-1.5 rounded">
  <div className={cn(bookingStatusStyles[row.original.status], "size-4 rounded-full")}/>
  <p>{row.original.status}</p>
</div>
    }
  },
      {
      
    id: "actions",
     header: () => <div className="text-right mr-2">Actions</div>,
    cell: ({ row }) => {
      const payment = row.original
 
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
      )
    },
  },
]