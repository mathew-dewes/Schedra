import { BookingStatus, BookingType } from "./enums";
import { Database } from "./supabase/types";


export type CategoryColor = Database["public"]["Enums"]["category_color"];

export type Renewal = Database["public"]["Tables"]["renewals"]["Row"];
export type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
export type Center = Database["public"]["Tables"]["service_centers"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];


export type RenewalInsert = Database["public"]["Tables"]["renewals"]["Insert"];
export type VehicleInsert = Database["public"]["Tables"]["vehicles"]["Insert"];
export type CenterInsert = Database["public"]["Tables"]["service_centers"]["Insert"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];


export type Category = {id: string, name: string, color: string}



export type BookingTableData = {
    id: string;
    title: string;
    status: BookingStatus;
    bookingDate: Date;
    center: string;
    center_email: string;
    plant: string;
    vehicle: string;
    plate_number: string;
    type: BookingType;
}

