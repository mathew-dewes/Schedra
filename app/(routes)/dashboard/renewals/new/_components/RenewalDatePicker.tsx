"use client"


import { Calendar } from "@/components/ui/calendar";
import { addYears, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

type Props = {
    value?: Date
    onChange: (date?: Date) => void
}

export function RenewalDatePicker({ value, onChange }: Props) {
    const [mounted, setMounted] = useState(false);

    const currentYear = new Date().getFullYear();
    const maxYear = addYears(new Date(), 1).getFullYear()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
                if (date) onChange(date)
            }}
            className="rounded-lg border"
            captionLayout="dropdown"
            defaultMonth={new Date()}
            fromYear={currentYear}
            toYear={maxYear}
            disabled={(date) => date < startOfDay(new Date())}

        />
    )
}
