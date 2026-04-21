"use server";

import { redirect } from "next/navigation";
import { createClientForServer } from "../supabase/server";

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
}
