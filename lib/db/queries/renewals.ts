"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { generateRenewalStatus } from "@/lib/utils";


export async function getRenewals() {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const { data, error } = await supabase.from("renewals")
        .select(`id, due_date, type, vehicles(make, model, year, plant_number)`).
        order("due_date", {ascending: true});


    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };

    const formatted = data?.map((renewal) => ({
        id: renewal.id,
        dueDate: new Date(renewal.due_date),
        type: renewal.type,
        vehicle: renewal.vehicles.make + " " + renewal.vehicles.model,
        plant: renewal.vehicles.plant_number.toUpperCase(),
        status: generateRenewalStatus(new Date(renewal.due_date))

    }));

    console.log(formatted);
    

    return formatted;

}