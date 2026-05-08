"use client"


import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

type Props = {
    value?: Date
    onChange: (date?: Date) => void
}

export function RenewalDatePicker({ value, onChange }: Props) {
  const [mounted, setMounted] = useState(false)

 useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null
    return (
        <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            className="rounded-lg border"
            captionLayout="dropdown"
            defaultMonth={new Date()}
            fromYear={2026}
            toYear={2030}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}

        />
    )
}
