import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, isBefore, isWithinInterval } from "date-fns";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
};


export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export function convertToMoney(value: number) {
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value)
};


export function generateRenewalStatus(dueDate: Date) {
    const now = new Date();

    if (isBefore(dueDate, now)) {
        return "Overdue";
    }
    if (isWithinInterval(dueDate,
        {
            start: now,
            end: addDays(now, 7)
        }
    )) {
        return "Due"
    }  else {
        return "Upcoming"
    }
};



