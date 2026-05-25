"use server";

import { centerFormSchema } from "@/lib/schemas";
import { createClientForServer, getUserId } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createCenter(values: z.infer<typeof centerFormSchema>) {
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = centerFormSchema.safeParse(values);

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
  .from("centers")
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

    const {error} = await supabase.from("centers").insert({
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

       const { error } = await supabase.from("centers").delete().eq("user_id", user_id).eq("id", id);
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
};



export async function updateCenter(values: z.infer<typeof centerFormSchema>, center_id: string){
    const supabase = await createClientForServer();
    const user_id = await getUserId();

    const parsed = centerFormSchema.safeParse(values);

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


    const {error: updateError} = await supabase.from("centers").update({
        name: parsed.data.name,
        contact_name: parsed.data.contact_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address,
        user_id
    }).eq("id", center_id).eq("user_id", user_id);

            if (updateError) {
        console.log(updateError);
        return {
            success: false,
            message: updateError.message
        }

    };

        return {
        success: true,
        message: `${parsed.data.name} was updated`
    }
}