import { BookingStatusEnum, BookingTypeEnum, RenewalStatusEnum, RenewalTypeEmum } from "./types/enums";


// Entries

export type BookingEntry = {
  id: string,
  title: string,
  bookingDate: Date,
  booking_type: BookingTypeEnum,
  categoryColor: string,
  vehicle: string,
  plant: string,
  center: string,
  status: BookingStatusEnum,
  plate_number: string

};


export type RenewalEntry = {
  id: string,
  dueDate: Date,
  type: RenewalTypeEmum,
  vehicle: string,
  plant: string,
  status: RenewalStatusEnum,
  vehicle_plate: string,
  notes: string
};

export type Activity = {
  id: string,
  activity: ActivityType,
  vehicle: string,
  time: Date
};


type ActivityType =
  | "service_booking"
  | "repair_booking"
  | "breakdown"
  | "wof_reminder"
  | "registration_reminder"
  | "ruc_reminder"
  | "service_reminder";