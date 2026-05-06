"use server";

import { vehicleFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import z from "zod";

export async function createVehicle(values: z.infer<typeof vehicleFormSchema>){
      const supabase = await createClientForServer();
        const user_id = await getUserId();

    const parsed = vehicleFormSchema.safeParse(values);

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


    const {error} = await supabase.from("vehicles").insert({
        make: parsed.data.make,
        model: parsed.data.model,
        plant_number: parsed.data.plant_number.toUpperCase(),
        plate_number: parsed.data.plate_number.toUpperCase(),
        year: parsed.data.year,
        user_id
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
        message: `${parsed.data.make} ${parsed.data.model} was added`
    }
}