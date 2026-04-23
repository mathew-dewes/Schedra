"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";

export async function getUserBusiness(){
        const user_id = await getUserId();
        const supabase = await createClientForServer();
    
        if (!user_id){
            return {
                success: false,
                message: "Unauthorized"
            }
        }

        const {data, error} = await supabase.from("businesses")
        .select("*, availability(day_of_week, is_active, start_time, end_time)").eq("owner_id", user_id).single();
    if (error){
        console.log("Error:", error);
        
        return {
            success: false,
            message: error.message
        }
    };

    return {
        success: true,
        business: data
    }

}

export async function checkBusiness(){
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    if (!user_id){
        return {
            success: false,
            message: "Unauthorized"
        }
    }

    const {data, error} = await supabase.from("businesses").select("count").eq("owner_id", user_id).single();

    if (error){
        console.log("Error:", error);
        
        return {
            success: false,
            message: error.message
        }
    };

    return data.count > 0
}