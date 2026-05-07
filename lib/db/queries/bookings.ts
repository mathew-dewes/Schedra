"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";

export async function getBookings(){
        const user_id = await getUserId();
        const supabase = await createClientForServer();
    
        if (!user_id) {
            return {
                success: false,
                message: "Unauthorized"
            }
        };

        const {data, error} = await supabase.from("bookings")
        .select(`id, title, description, start_date, status, 
            vehicles(make, model, plant_number, plate_number), 
            categories(name, color),
            service_centers(name)
            `)
        .eq("user_id", user_id);

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
        category: booking.categories.name,
        categoryColor: booking.categories.color,
        center: booking.service_centers?.name,
        plant: booking.vehicles.plant_number,
        vehicle: booking.vehicles.make + " " + booking.vehicles.model + " - " + booking.vehicles.plate_number
    
    }));

    return formatted
}