"use server";

import { createClientForServer, getUserId } from "@/lib/supabase/server";


export async function getBusinessServices(business_id: string){
  const supabase = await createClientForServer();
    

  const {data, error} = await supabase.from("services")
  .select("id, name, description, duration_minutes, price")
  .eq("business_id", business_id)
  .order("created_at", {ascending: false})

   if (error){
        console.log("Error:", error);
        
        return {
            success: false,
            message: error.message
        }
    };

   return {
        success: true,
        services: data
    }


};


export async function getServices(){
        const user_id = await getUserId();
        const supabase = await createClientForServer();
    
        if (!user_id){
            return {
                success: false,
                message: "Unauthorized"
            }
        }

        const {data, error} = await supabase.from("services")
        .select("id, name, description, duration_minutes, price")
        .eq("user_id", user_id);

        if (error){
            return {
                success: false,
                message: error.message
            }
        } else {
            return data;
        }
}