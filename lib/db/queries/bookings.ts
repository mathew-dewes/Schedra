"use server";

import { BookingStatus, BookingType } from "@/lib/enums";
import { createClientForServer, getUserId } from "@/lib/supabase/server";


type GetBookingsProps = {
    status?: BookingStatus;
    type?: BookingType;
};

export async function getBookings({
    status, type
}: GetBookingsProps = {}) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    let query = supabase.from("bookings")
        .select(`id, title, description, type, start_date, status, 
            vehicles(make, model, plant_number, plate_number), 
            service_centers(name, email)
            `)
        .eq("user_id", user_id).order("start_date", { ascending: true });

    if (status) {
        query = query.eq("status", status)
    };

    if (type) {
        query = query.eq("type", type)
    };

    const { data, error } = await query;

    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };



    const formatted = data?.map((booking) => ({

        id: booking.id,
        title: booking.title,
        status: booking.status,
        bookingDate: new Date(booking.start_date),
        center: booking.service_centers?.name,
        center_email: booking.service_centers?.email,
        plant: booking.vehicles.plant_number,
        vehicle: booking.vehicles.make + " " + booking.vehicles.model,
        plate_number: booking.vehicles.plate_number,
        type: booking.type

    }));

    return formatted
};

export async function getUpcomingBookings() {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const query = supabase.from("bookings")
        .select(`id, title, type, description, start_date, status, 
            vehicles(make, model, plant_number, plate_number), 
            service_centers(name, email)
            `)
        .eq("user_id", user_id).order("start_date", { ascending: true }).limit(10);



    const { data, error } = await query;

    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };



    const formatted = data?.map((booking) => ({

        id: booking.id,
        title: booking.title,
        type: booking.type,
        status: booking.status,
        bookingDate: new Date(booking.start_date),
        center: booking.service_centers?.name,
        center_email: booking.service_centers?.email,
        plant: booking.vehicles.plant_number,
        vehicle: booking.vehicles.make + " " + booking.vehicles.model,
        plate_number: booking.vehicles.plate_number

    }));

    return formatted
};

