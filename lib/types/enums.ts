import { Database } from "../supabase/types";

export type BookingStatusEnum = Database["public"]["Enums"]["booking_status"];

export type BookingTypeEnum = Database["public"]["Enums"]["booking_type"];

export type RenewalTypeEmum = Database["public"]["Enums"]["renewal_type"];

export type RenewalStatusEnum = Database["public"]["Enums"]["renewal_status"]