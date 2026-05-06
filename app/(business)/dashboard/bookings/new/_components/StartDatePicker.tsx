"use client"

import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react"

type Props = {
  value?: Date
  onChange: (date?: Date) => void
}

export function StartDatePicker({ value, onChange }: Props) {
   const [open, setOpen] = useState(false) 
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
             onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
          defaultMonth={value}
          
        />
      </PopoverContent>
    </Popover>
  )
}
