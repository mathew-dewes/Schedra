"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { BookingStatusEnum, BookingTypeEnum } from "@/lib/types/enums";


type GetBookingsProps = {
    status?: BookingStatusEnum;
    type?: BookingTypeEnum;
};

export async function getBookings({
    status,
    type,
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
        .select(`id, title, description, start_date, status, booking_type, 
            vehicles(make, model, plant_number, plate_number), 
            service_centers(name)
            `)
        .eq("user_id", user_id);

    if (status){
        query = query.eq("status", status)
    };

        if (type) {
        query = query.eq("booking_type", type);
    }

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
        plant: booking.vehicles.plant_number,
        booking_type: booking.booking_type,
        vehicle: booking.vehicles.make + " " + booking.vehicles.model,
        plate_number: booking.vehicles.plate_number

    }));

    return formatted
};
