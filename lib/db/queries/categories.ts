"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";

export async function getCategories(){
           const user_id = await getUserId();
            const supabase = await createClientForServer();
        
            if (!user_id) {
                return {
                    success: false,
                    message: "Unauthorized"
                }
            };

            const {data, error} = await supabase.from("categories").
            select().eq("user_id", user_id);
                
        if (error){
            console.log("Error:", error);
               return {
            success: false,
            message: error.message
        }
        }

        return data
}