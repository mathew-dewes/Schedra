import { Database } from "../supabase/types";


export type CategoryColor = Database["public"]["Enums"]["category_color"]


export type CenterType = {
id: string;
name: string;
contact_name: string,
phone: string,
email: string,
address: string,
notes: string,  
};

export type CategoryType = {
    id: string;
    name: string;
    color: CategoryColor;
    bookingCount: number;
}



export type VehicleType = {
    id: string;
    make: string,
    model: string,
    year: string,
    plant_number: string,
    plate_number: string
};

export type BookingType = {
  id: string,
  title: string,
  bookingDate: Date
  category: string
  categoryColor: string,
  vehicle: string
  plant: string
  center: string
  status: BookingStatus

}


export type BookingStatus =
  Database["public"]["Enums"]["booking_status"]

export type Center = { id: string; name: string };
export type Vehicle = { id: string; name: string };
export type Category = {id: string, name: string, color: string}
