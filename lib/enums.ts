import { Database } from "./supabase/types";

export type VehicleStatus = Database["public"]["Enums"]["vehicle_status"];
export type RenewalType = Database["public"]["Enums"]["renewal_type"];
export type BookingType = Database["public"]["Enums"]["booking_type"];
export type BookingStatus = Database["public"]["Enums"]["booking_status"];