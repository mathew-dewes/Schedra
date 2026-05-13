"use server";

import { renewalFormSchema, updateRenewalFormSchema } from "@/lib/schemas";
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



        const {error} = await supabase.from("renewals").insert({
            type: parsed.data.type as RenewalTypeEmum,
            vehicle_id: parsed.data.vehicle_id,
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
        
};

export async function updateRenewal(values: z.infer<typeof updateRenewalFormSchema>, renewal_id: string){
      const supabase = await createClientForServer();
        const user_id = await getUserId();
    
        const parsed = updateRenewalFormSchema.safeParse(values);
    
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



        const {error} = await supabase.from("renewals").update({
            notes: parsed.data.notes,
            due_date: parsed.data.dueDate.toISOString()
        }).eq("id", renewal_id).eq("user_id", user_id);

           if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    return {
        success: true,
        message: `renewal was updated`
    }
        
}