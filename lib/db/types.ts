import { Database } from "../supabase/types";


export type CategoryColor = Database["public"]["Enums"]["category_color"]


export type Business = {
    id: string,
    name: string;
    slug: string;
    description: string | null;
    availability: {
        day_of_week: number;
        is_active: boolean | null;
        start_time: string;
        end_time: string;
    }[];
    services: {
        id: string
        name: string;
        description: string;
        duration_minutes: number;
        price: number;
    }[];

};


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

export const BOOKING_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type BookingStatus =
  typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS];


