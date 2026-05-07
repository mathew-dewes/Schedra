"use server";

import { bookingFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import z from "zod";
import { BookingStatus } from "../types";


export async function createBooking(values: z.infer<typeof bookingFormSchema>){
      
    
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

    console.log(parsed);




 const { error } = await supabase.from("bookings").insert({
  title: parsed.data.title,
  description: parsed.data.description ?? null,
  status: parsed.data.status as BookingStatus,
  start_date: parsed.data.start_date.toISOString(),
  center_id: parsed.data.center_id,
  vehicle_id: parsed.data.vehicle_id,
  category_id: parsed.data.category_id,
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


    
}
