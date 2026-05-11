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

import { CenterType } from "@/lib/db/types"
import DeleteCenterButton from "../DeleteCenterButton"

export const CenterColumns: ColumnDef<CenterType>[] = [
  {
    accessorKey: "name",
    header: "Center",
  },
      {
    accessorKey: "contact_name",
    header: "Contact person",
  },
  {
    accessorKey: "email",
       header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

    {
    accessorKey: "phone",
    header: "Phone",
  },
    {
    accessorKey: "address",
    header: "Address",
  },


      {
      
    id: "actions",
     header: () => <div className="text-right mr-2">Actions</div>,
    cell: ({row}) => {
      const center = row.original;
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
<DeleteCenterButton center_id={center.id}/>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
      )
    },
  },
]