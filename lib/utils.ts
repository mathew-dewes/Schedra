import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, isWithinInterval, subDays } from "date-fns";


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

      if (isWithinInterval(dueDate,
        {start: subDays(now, 90), end:now 
        }
    )) {
        return "Overdue"
    } 
    if (isWithinInterval(dueDate,
        {start: now, end: addDays(now, 7)
        }
    )) {
        return "Due Soon"
    }  else {
        return "Upcoming"
    }
};

export const normalizeText = (status: string) => {
  return status
    .toLowerCase()
    .replace(/\s+/g, "")
}



