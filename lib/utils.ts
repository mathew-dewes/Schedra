import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";

    const value = `${String(hours).padStart(2, "0")}:${minutes}`;

    return value;
});



export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFKD')                 // split accented characters
    .replace(/[\u0300-\u036f]/g, '')   // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')      // remove invalid chars
    .replace(/\s+/g, '-')              // replace spaces with -
    .replace(/-+/g, '-');              // collapse multiple -
};


export function convertToMoney(value: number){
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value)
};
