"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { Activity } from "@/lib/types";

export async function getRecentActivities() {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        };
    };

    const { error: bookingError, data: bookings } = await supabase.from("bookings").select(`
            id, title, created_at, vehicles(make, model, plate_number)`) .eq("user_id", user_id)
  .order("created_at", { ascending: false })
  .limit(5);

    if (bookingError) {
        console.log("Error:", bookingError);
        return {
            success: false,
            message: bookingError.message
        }
    };


    const { error: renewalError, data: renewals } = await supabase.from("renewals").select(`
        id, created_at, type, vehicles(make, model, plate_number)`) .eq("user_id", user_id)
  .order("created_at", { ascending: false })
  .limit(5);

    if (renewalError) {
        console.log("Error:", renewalError);
        return {
            success: false,
            message: renewalError.message
        }
    };

    const bookingActivities: Activity[] =
        bookings.map((booking) => ({
            id: booking.id,
            activity: booking.title,
            type: "Booking",
            vehicle: booking.vehicles.make + " " + booking.vehicles.model + " - " + booking.vehicles.plate_number,
            time: new Date(booking.created_at),
        }));

    const renewalActivities: Activity[] =
        renewals.map((renewal) => ({
            id: renewal.id,
            activity: renewal.type,
            type: "Renewal",
            vehicle: renewal.vehicles.make + " " + renewal.vehicles.model + " - " + renewal.vehicles.plate_number,
            time: new Date(renewal.created_at),
        }));

    return [
        ...bookingActivities,
        ...renewalActivities,
    ]
}