"use server";

import { redirect } from "next/navigation";
import { createClientForServer } from "../supabase/server";
import z from "zod";
import { loginSchema, registerSchema } from "../schemas";

export async function signInWithGoogle(){
const supabase = await createClientForServer();

const auth_callback_url = `${process.env.SITE_URL}/auth/callback`


const {data, error} = await supabase.auth.signInWithOAuth({
    provider: "google",
    options:{
        redirectTo: auth_callback_url
    }
});

if (data){
redirect(data.url!)
}


if (error){
    console.log(error);
    
}

};

export async function SignOut(){
    const supabase = await createClientForServer();
    const {error} = await supabase.auth.signOut();

    if (error){
        console.log(error);
        
    } else {
        return {success: true, message: "Signout out successful"}
    }
};


export async function signUpWithEmailPassword(values: z.infer<typeof registerSchema>){
    const supabase = await createClientForServer();

        const parsed = registerSchema.safeParse(values);

        if (!parsed.success){
            return {success: false, message: "Validation failed"}
        };

            const {data, error} = await supabase.auth.signUp({
                email: parsed.data.email,
                password: parsed.data.confirmPassword});

                if (error){
                    console.log('Error', error);
                    return {
                        success: false,
                        message: error.message
                    }
                    
                }

                console.log(data);
                

                return {
                    success:true,
                    message: 'Please check your email',
            

                }


}
export async function signInWithEmailPassword(values: z.infer<typeof loginSchema>){
    const supabase = await createClientForServer();

        const parsed = loginSchema.safeParse(values);

        if (!parsed.success){
            return {success: false, message: "Validation failed"}
        };

            const {error} = await supabase.auth.signInWithPassword({
                email: parsed.data.email,
                password: parsed.data.password});

                if (error){
                    console.log('Error', error);
                    return {
                        success: false,
                        message: error.message
                    }
                    
                }

            
                

                return {
                    success:true,
                    message: 'Login in successful',
            

                }


}
