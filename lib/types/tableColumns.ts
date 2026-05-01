export type BookingColumn = {
  id: string
  bookingDate: Date
  bookingTime: Date
  customer: string
  service: string
  status: "pending" | "Complete" | "success" | "Canceled"
  email: string
  address: string
  phone: string
}
export type CustomerColumn = {
  id: string
  customer: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
export type ServiceColumn = {
  id: string
  name: string
  description: string
  duration_minutes: number
  price: number

}