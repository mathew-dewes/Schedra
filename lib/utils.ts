import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, isWithinInterval, subDays } from "date-fns";
import { BookingType } from "./enums";


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
};




export function randomNumber(min: number, max:  number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export function generateDueDate(index: number) {
  
  const date = new Date();

   if (index < 5) {
    date.setDate(date.getDate() - randomNumber(1, 90));
    return date;
  }

  if (index < 10) {
    date.setDate(date.getDate() + randomNumber(0, 7));
    return date;
  }

  date.setDate(date.getDate() + randomNumber(8, 365));

  return date;
};

export function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
};

export function generateRandomDate(): Date {
    const now = new Date();
    const offset = Math.floor(Math.random() * 180);
    now.setDate(now.getDate() + offset);
    return now;
};


export function generateBookingTitle(type: BookingType): string {
    const serviceTitles = [
        "Oil Change"
    ];

    const repairTitles = [
        "Brake Repair",
        "Engine Diagnostics",
        "Suspension Repair",
        "Radiator Replacement",
        "Starter Motor Repair",
        "Electrical Fault",
        "Transmission Repair",
        "Leak Investigation"
    ];

    if (type === "Service") {
        return getRandom(serviceTitles);
    }

    return getRandom(repairTitles);
}





