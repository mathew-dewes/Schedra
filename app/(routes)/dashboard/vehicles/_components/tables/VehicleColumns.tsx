"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VehicleType } from "@/lib/db/types"
import { vehicleStatusStyles } from "@/lib/constants"
import { cn } from "@/lib/utils"



export const VehicleColumns: ColumnDef<VehicleType>[] = [
  {
    accessorKey: "make",
    header: "Make",
  },
  
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },

  {
    accessorKey: "plant_number",
       header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >Plant
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
      {
    accessorKey: "plate_number",
    header: "Plate number",
  },
        {
      accessorKey: "status",
      header: "Status",
      cell:({row})=>{
  return <div className="flex w-fit items-center gap-2 p-1.5">
    <div className={cn(vehicleStatusStyles[row.original.status], "size-4 rounded-full")}/>
    <p>{row.original.status}</p>
  </div>
      }
    },
      {
      
    id: "actions",
     header: () => <div className="text-right mr-2">Actions</div>,
    cell: () => {
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
              onClick={() => navigator.clipboard.writeText("Hello")}
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