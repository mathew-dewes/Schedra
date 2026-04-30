"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type BookingDatePickerProps = {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

export default function BookingDatePicker({
  value,
  onChange,
}: BookingDatePickerProps) {

  return (
    <Popover>
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
          onSelect={onChange}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  )
}
