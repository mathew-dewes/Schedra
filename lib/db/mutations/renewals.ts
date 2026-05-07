"use server";

import { renewalFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { RenewalTypeEmum } from "@/lib/types/enums";
import z from "zod";


export async function createRenewal(values: z.infer<typeof renewalFormSchema>){
      const supabase = await createClientForServer();
        const user_id = await getUserId();
    
        const parsed = renewalFormSchema.safeParse(values);
    
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

        console.log(parsed);

        const {error} = await supabase.from("renewals").insert({
            type: parsed.data.type as RenewalTypeEmum,
            vehicle_id: parsed.data.vehicle_id,
            status: "Upcoming",
            due_date: parsed.data.due_date.toISOString(),
            user_id

        });

           if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `${parsed.data.type} renewal was added`
    }
        
}