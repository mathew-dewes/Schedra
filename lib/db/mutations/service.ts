"use server";

import { serviceFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createService(values: z.infer<typeof serviceFormSchema>, business_id: string){
        const supabase = await createClientForServer();
        const user_id = await getUserId();

        const parsed = serviceFormSchema.safeParse(values);

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

    const {error} = await supabase.from("services").insert({
        business_id,
        name: parsed.data.name,
        description: parsed.data.description,
        duration_minutes: Number(parsed.data.duration_minutes),
        price: Number(parsed.data.price),
    });

       if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    revalidatePath('/on-boarding/service')

       return {
        success: true,
        message: `${parsed.data.name} was added`
    }
}