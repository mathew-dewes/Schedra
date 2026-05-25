"use server";

import { bookingFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { BookingStatusEnum } from "@/lib/types/enums";
import { revalidatePath } from "next/cache";
import z from "zod";



export async function createBooking(values: z.infer<typeof bookingFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = bookingFormSchema.safeParse(values);

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    }

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed"

        }
    };



    const { error } = await supabase.from("bookings").insert({
        title: parsed.data.title,
        description: parsed.data.description ?? null,
        status: "Scheduled",
        start_date: parsed.data.start_date.toISOString(),
        center_id: parsed.data.center_id,
        vehicle_id: parsed.data.vehicle_id,
        type: parsed.data.type,
        user_id,
    });

    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `${parsed.data.title} was added`
    }



};


export async function changeBookingStatus(id: string, status: BookingStatusEnum) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const { error } = await supabase.from("bookings").update({
        status
    }).eq("user_id", user_id).eq("id", id);
    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    revalidatePath('/dashboard/bookings')

    return {
        success: true,
        message: `Booking status updated`
    }
};

export async function deleteBooking(id: string){
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

       const { error } = await supabase.from("bookings").delete().eq("user_id", user_id).eq("id", id);
    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    revalidatePath('/dashboard/bookings')

    return {
        success: true,
        message: `Booking deleted`
    }
}
