import { BookingStatusEnum, BookingTypeEnum, RenewalStatusEnum, RenewalTypeEmum } from "./enums"

export type BookingEntry = {
  id: string,
  title: string,
  bookingDate: Date,
  booking_type: BookingTypeEnum,
  categoryColor: string,
  vehicle: string,
  plant: string,
  center: string,
  center_email: string,
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
};

export type ActivityEntry = {
  id: string,
  event: string,
  vehicle: string,
  type: "Booking" | "Renewal",
  time: Date
}