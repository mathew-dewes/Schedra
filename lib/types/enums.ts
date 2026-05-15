import { Database } from "../supabase/types";

export type BookingStatusEnum = Database["public"]["Enums"]["booking_status"];

export type RenewalTypeEmum = Database["public"]["Enums"]["renewal_type"];

export type RenewalStatusEnum = Database["public"]["Enums"]["renewal_status"];

export type VehicleStatusEnum = Database["public"]["Enums"]["vehicle_status"];