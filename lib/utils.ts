import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isFuture, isToday } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export function convertToMoney(value: number){
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value)
};


export function generateRenewalStatus(dueDate: Date){
if (isToday(dueDate)){
    return "Due"
} else if (isFuture(dueDate)) {
    return "Upcoming"
} else {
    return "Overdue"
}
};



