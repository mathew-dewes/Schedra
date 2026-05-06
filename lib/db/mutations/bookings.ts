"use server";

import { bookingFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import z from "zod";


export async function createBooking(values: z.infer<typeof bookingFormSchema>){
      
    console.log(values);
    return
    
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

    console.log(parsed.data);
    
}
