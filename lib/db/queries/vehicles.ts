"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";


export async function getVehicles(){
        const user_id = await getUserId();
        const supabase = await createClientForServer();
    
        if (!user_id) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }

        const {data, error} = await supabase.from("vehicles")
        .select("id, make, model, year, plant_number, plate_number")
        
        
        if (error){
            console.log("Error:", error);
               return {
            success: false,
            message: error.message
        }
        }

        return data
}