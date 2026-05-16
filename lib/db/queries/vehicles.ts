"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { VehicleStatusEnum } from "@/lib/types/enums";

type GetVehiclesProps = {
    status?: VehicleStatusEnum;

};

export async function getVehicles({
    status,

}: GetVehiclesProps = {}) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    }

    let query = supabase.from("vehicles")
        .select("id, make, model, year, plant_number, plate_number, status").order("created_at",{ascending: false})


    if (status) {
        query = query.eq("status", status)
    };
      if (status){
        query = query.eq("status", status)
    };

          const { data, error } = await query;

    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    }

    return data
};
