"use server";
import { categoryFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import z from "zod";
import { CategoryColor } from "../types";

export async function createCategory(values: z.infer<typeof categoryFormSchema>){
      const supabase = await createClientForServer();
        const user_id = await getUserId();

    const parsed = categoryFormSchema.safeParse(values);

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

    const {error} = await supabase.from("categories").insert({
        name: parsed.data.name,
        color: parsed.data.color as CategoryColor,
        sort_order: 1,
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
        message: `${parsed.data.name} was added`
    }
}