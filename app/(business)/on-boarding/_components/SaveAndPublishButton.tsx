"use client"

import { Button } from "@/components/ui/button";
import { setBusinessActive } from "@/lib/db/mutations/business";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SaveAndPublishButton({business_id}:
    {business_id: string}
){
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  function onSubmit(){
    startTransition((async()=>{
        const res = await setBusinessActive(business_id);

        if (!res.success){
            toast.error(res.message)
        } else {
            toast.success(res.message);
            router.push('/dashboard')
        }
    }))
  }
    return(
             <Button disabled={isPending} onClick={onSubmit}>Save and Publish</Button>
    )
}