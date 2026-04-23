"use server";

import { createClientForServer } from "@/lib/supabase/server";


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


}