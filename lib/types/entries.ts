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
  status: BookingStatusEnum

};


export type RenewalEntry = {
  id: string,
  dueDate: Date,
  type: RenewalTypeEmum,
  vehicle: string,
  plant: string,
  status: RenewalStatusEnum,
  vehicle_plate: string,
}