"use server";

import { renewalFormSchema, updateRenewalFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { RenewalTypeEmum } from "@/lib/types/enums";
import { revalidatePath } from "next/cache";
import z from "zod";

type Vehicle = {
    id: string, name: string
    
}

export async function createRenewal(values: z.infer<typeof renewalFormSchema>, vehicle: Vehicle){
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

        const { data: typeExist, error: validateTypeError } = await supabase
  .from("renewals")
  .select("type")
  .eq("user_id", user_id)
  .eq("type", parsed.data.type)
  .eq("vehicle_id", vehicle.id)
  .limit(1);


     if (validateTypeError) {
        console.log(validateTypeError);
        return {
            success: false,
            message: validateTypeError.message
        };

    };
    if (typeExist?.length) {
  return {
    success: false,
    message: `Renewal type ${parsed.data.type} is already used for ${vehicle.name}`,
    fieldErrors: {
      type: `Renewal type ${parsed.data.type} is already used for ${vehicle.name}`
    }
  };
}



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
            due_date: parsed.data.dueDate.toISOString(),
            updated_at: new Date().toISOString(),
            renewed_at: new Date().toISOString()
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
        
};

export async function deleteRenewal(id: string){
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

       const { error } = await supabase.from("renewals").delete().eq("user_id", user_id).eq("id", id);
    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    revalidatePath('/dashboard/renewals')

    return {
        success: true,
        message: `Renewal deleted`
    }
}