import { BookingStatusEnum, BookingTypeEnum } from "./enums"

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

}