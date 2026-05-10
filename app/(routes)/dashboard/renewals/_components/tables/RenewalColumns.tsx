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
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { RenewalEntry } from "@/lib/types/entries"
import { renewalStatusStyles } from "@/lib/constants"




export const RenewalColumns: ColumnDef<RenewalEntry>[] = [
  {
    accessorKey: "bookingDate",
    header: "Due date",
    cell:({row})=>{
      return <div>{format(row.original.dueDate, "dd/MM/yy") }</div>
    }
  
  },


      {
    accessorKey: "type",
    header: "Type",
    cell:({row})=>{
      return <Badge variant={"secondary"} >{row.original.type}</Badge>

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
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
return <div className="flex w-fit items-center gap-2 p-1.5">
  <div className={cn(renewalStatusStyles[row.original.status], "size-4 rounded-full")}/>
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