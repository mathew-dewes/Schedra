"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { RenewalStatusEnum, RenewalTypeEmum } from "@/lib/types/enums";
import { generateRenewalStatus } from "@/lib/utils";


type GetRenewalsProps = {
    status?: RenewalStatusEnum;
    type?: RenewalTypeEmum;
};

export async function getRenewals({
    status,
    type,
}: GetRenewalsProps = {}) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    let query = supabase.from("renewals")
        .select(`id, due_date, type, vehicles(make, model, year, plant_number, plate_number)`).
        order("due_date", {ascending: true});


        if (type) {
        query = query.eq("type", type);
    };
    
   if (status){
        query = query.order("created_at", {ascending: false})
    };

      const { data, error } = await query;
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
        status: generateRenewalStatus(new Date(renewal.due_date)),
        vehicle_plate: renewal.vehicles.plate_number

    }));

       const filtered = status
        ? formatted.filter(
              (renewal) =>
                  renewal.status === status
          )
        : formatted;

 
    

    return filtered;

};


export async function getRenewal(renewal_id: string){
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

    const {data: renewal, error} = await supabase.from("renewals")
    .select("id, vehicles(make, model, plate_number, plant_number), type, due_date, notes")
    .eq("id", renewal_id).single();
       
    if (error) {
        console.log("Error:", error);
        return {
            success: false,
            message: error.message
        }
    };

    return {
        id: renewal.id,
        dueDate: new Date(renewal.due_date),
        type: renewal.type,
        vehicle: renewal.vehicles.make + " " + renewal.vehicles.model,
        plant: renewal.vehicles.plant_number.toUpperCase(),
        status: generateRenewalStatus(new Date(renewal.due_date)),
        vehicle_plate: renewal.vehicles.plate_number
    };

}