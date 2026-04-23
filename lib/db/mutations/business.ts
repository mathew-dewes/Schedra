"use server";

import { businessFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import z from "zod";


export async function createBusiness(values: z.infer<typeof businessFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const dayMap = {
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 0,
    } as const;

    type Day = keyof typeof dayMap;

    const parsed = businessFormSchema.safeParse(values);

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

    const { data: business, error: businessError } = await supabase.from("businesses").insert(
        {
            name: parsed.data.name,
            email: parsed.data.email,
            address: parsed.data.address,
            slug: slugify(parsed.data.name),
            description: parsed.data.description,
            owner_id: user_id,
            phone: parsed.data.phone
        }).select().single();

    if (businessError) {
        console.log(businessError);
        return {
            success: false,
            message: businessError.message
        }

    };

    const availabilityRows = Object.entries(parsed.data.hours).map(
        ([day, value]) => {
            const typedDay = day as Day;
            return {
                business_id: business.id,
                day_of_week: dayMap[typedDay],
                start_time: value.open,
                end_time: value.close,
                is_active: value.enabled,
            }

        }
    );

    const { error: availabilityError } = await supabase
        .from("availability")
        .insert(availabilityRows);

    if (availabilityError) {
        console.log(availabilityError);
        return {
            success: false,
            message: availabilityError.message,
        };
    }

    return {
        success: true,
        message: `${parsed.data.name} was added`
    }
}