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
        .select("id, make, model, year, plant_number, plate_number, status")


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


export async function getVehicleStatusTotals() {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const { data, error } = await supabase
        .from("vehicle_status_totals")
        .select("status,total")
        .eq("user_id", user_id)

    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    }

    const totalsByStatus = (data ?? []).reduce<Record<string, number>>((acc, row) => {
        if (!row?.status) return acc
        acc[row.status] = row.total == null ? 0 : Number(row.total)
        return acc
    }, {})

    const statuses = [
        "Available",
        "In service",
        "Out of service",
        "Under maintenance",
    ]

    return statuses.map((status) => ({
        status,
        total: totalsByStatus[status] ?? 0,
    }))
}