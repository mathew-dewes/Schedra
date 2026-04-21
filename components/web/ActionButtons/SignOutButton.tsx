"use client";

import { Button } from "@/components/ui/button"
import { SignOut } from "@/lib/auth/actions"

export default function SignOutButton(){
    return  <Button onClick={async()=>{
                    await SignOut()
                }}>Sign out</Button>
}