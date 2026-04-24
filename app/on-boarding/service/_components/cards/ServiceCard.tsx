"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { removeService } from "@/lib/db/mutations/service";
import { convertToMoney } from "@/lib/utils";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ServiceCard({id ,title, desc, price, duration}:
  {id: string ,title: string, desc: string, price: number, duration: number}
){

  const [isPending, startTranstion] = useTransition()


  function handleDelete(){
    startTranstion((async()=>{
      const res = await removeService(id);

      if (!res.success){
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    }))

  }
    return  <Card size="sm" className="w-full h-fit sm:max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription hidden={desc == ""}>
          Desc: {desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p><span className="font-semibold">Price:</span> {convertToMoney(price)}</p>
        <p><span className="font-semibold">Duration:</span> {duration} minutes</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
        disabled={isPending} 
        onClick={()=>handleDelete()}
        variant="destructive" size="sm">
          Remove
        </Button>
      </CardFooter>
    </Card>
}