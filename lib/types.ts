import { BookingStatusEnum, RenewalStatusEnum, RenewalTypeEmum } from "./types/enums";


// Entries

export type BookingEntry = {
  id: string,
  title: string,
  bookingDate: Date,
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
  activity: string,
  type: "Renewal" | "Booking"
  vehicle: string,
  time: Date,
};


export type RenewalChartEntry = {
  date: string,
  WOF: number,
  REGO: number,
  RUC: number,
  SERVICE: number
}

