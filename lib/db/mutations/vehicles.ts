"use server";

import { vehicleFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { VehicleStatusEnum } from "@/lib/types/enums";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createVehicle(values: z.infer<typeof vehicleFormSchema>) {
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

    const plantNumber = parsed.data.plant_number.toUpperCase();
    const plateNumber = parsed.data.plate_number.toUpperCase();

    const { data: existingVehicles, error: validateVehicleError } = await supabase
        .from("vehicles")
        .select("plant_number, plate_number")
        .eq("user_id", user_id)
        .or(`plant_number.eq.${plantNumber},plate_number.eq.${plateNumber}`)
        .limit(1);

    if (validateVehicleError) {
        console.log(validateVehicleError);
        return {
            success: false,
            message: validateVehicleError.message
        };
    }

    const existing = existingVehicles?.[0];
    if (existing?.plant_number === plantNumber) {
        return {
            success: false,
            message: `Plant number ${parsed.data.plant_number} is already in use`,
            fieldErrors: {
                plant_number: `Plant number ${parsed.data.plant_number} is already in use`
            }
        };
    }

    if (existing?.plate_number === plateNumber) {
        return {
            success: false,
            message: `Plate number ${parsed.data.plate_number} is already in use`,
            fieldErrors: {
                plate_number: `Plate number ${parsed.data.plate_number} is already in use`
            }
        };
    }

    const { error } = await supabase.from("vehicles").insert({
        make: parsed.data.make,
        model: parsed.data.model,
        plant_number: parsed.data.plant_number.toUpperCase(),
        plate_number: parsed.data.plate_number.toUpperCase(),
        year: parsed.data.year,
        user_id
    });

    if (error) {

        return {
            success: false,
            message: error.message
        }

    };



    return {
        success: true,
        message: `${parsed.data.make} ${parsed.data.model} was added`
    }
};

export async function changeVehicleStatus(id: string, status: VehicleStatusEnum) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const { error } = await supabase.from("vehicles").update({
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


export async function deleteVehicle(id: string) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const { error } = await supabase.from("vehicles").delete().eq("user_id", user_id).eq("id", id);
    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    revalidatePath('/dashboard/vehicles')

    return {
        success: true,
        message: `Vehicle deleted`
    }
}