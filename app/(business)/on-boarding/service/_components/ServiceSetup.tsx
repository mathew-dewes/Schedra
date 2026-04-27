import { Button, buttonVariants } from "@/components/ui/button";
import SavedServices from "./SavedServices";
import ServiceForm from "./ServiceForm";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { days } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getUserBusiness } from "@/lib/db/queries/business";
import { Business } from "@/lib/db/types";


export default async function ServiceSetup(){

    const business = await getUserBusiness() as Business;

   const services = business?.services;

const availability = days.map((dayName, index) => {
  const match = business?.availability?.find(
    (a) => a.day_of_week === index
  );

  return {
    day: dayName,
    isOpen: match?.is_active ?? false,
    hours: match?.is_active
      ? `${match.start_time.slice(0, 5)} - ${match.end_time.slice(0, 5)}`
      : "Closed",
  };
});

if (!business){
    return <p>No business found</p>
}

 
     

    

    
    return (
        <div>
            <Card className="w-full sm:max-w-md md:max-w-xl">
                <CardHeader>
                    <CardTitle>Business: {business?.name}</CardTitle>
                    <CardDescription>Description: {business?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <h2 className="font-semibold">Business hours:</h2>
                        <div className="mt-1 grid md:grid-cols-3 gap-1">
                            {availability.map((item)=>{
                                return <div key={item.day} className="flex gap-2 items-center">
                        <h2 className="capitalize font-semibold">{item.day}</h2>
                        -
                        <p className={cn(`${item.hours == "Closed" ?
                            "text-red-500 font-medium" : ""
                        }`)}>{item.hours}</p>
        
                        </div>
                            })}

                        
                        </div>
                    </div>
                 
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Link className={buttonVariants()} href={'/on-boarding/business'}>Update Details</Link>
                </CardFooter>
        
                
            </Card>

            <div className="grid lg:grid-cols-2 gap-5 mt-5">
            <ServiceForm business_id={business.id}/>
           <SavedServices services={services}/>
            </div>
            <Button className="mt-5">Save and exit</Button>
       
        </div>
    )
}