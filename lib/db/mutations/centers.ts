"use server";

import { serviceProviderFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import z from "zod";

export async function createProvider(values: z.infer<typeof serviceProviderFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = serviceProviderFormSchema.safeParse(values);

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


    const {error} = await supabase.from("service_centers").insert({
        name: parsed.data.name,
        contact_name: parsed.data.contact_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
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
};