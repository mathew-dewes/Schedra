"use server";

import { serviceProviderFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
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


const { data: emailExist, error: validateEmailError } = await supabase
  .from("service_centers")
  .select("email")
  .eq("user_id", user_id)
  .eq("email", parsed.data.email)
  .limit(1);


     if (validateEmailError) {
        console.log(validateEmailError);
        return {
            success: false,
            message: validateEmailError.message
        };

    };
    if (emailExist?.length) {
  return {
    success: false,
    message: `Email address ${parsed.data.email} is already used under another center`,
    fieldErrors: {
      email: `Email address ${parsed.data.email} is already used under another center`
    }
  };
}

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

export async function deleteCenter(id: string){
    const supabase = await createClientForServer();
    const user_id = await getUserId();


    if (!user_id) {
        return {
            success: false,
            message: "Unauthorized"
        }
    };

       const { error } = await supabase.from("service_centers").delete().eq("user_id", user_id).eq("id", id);
    if (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        }

    };

    revalidatePath('/dashboard/centers')

    return {
        success: true,
        message: `Center deleted`
    }
}