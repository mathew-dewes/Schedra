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
name: string;
contact_name: string,
phone: string,
email: string,
address: string,
notes: string,  
};

export type CategoryType = {
    name: string;
    color: CategoryColor;
    bookingCount: number;
}



export type VehicleType = {
    make: string,
    model: string,
    year: string,
    plant_number: string,
    plate_number: string
};


