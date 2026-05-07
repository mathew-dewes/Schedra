import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { days } from "@/lib/constants";
import { Business, Services } from "@/lib/db/types";
import { cn, convertToMoney } from "@/lib/utils";

export default function BusinessOverview({ business, services, finalReview }:
    { business: Business, services: Services, finalReview: boolean }
) {

    if (!finalReview) return 


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
    return (
        <Card className="mt-5 w-full max-w-lg">
            <CardHeader>
                <CardTitle className="font-semibold">Final overview</CardTitle>

            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                <h2>Business name: {business.name}</h2>
                <p>Description: {business.description}</p>
                <p>Work hours:</p>
                </div>
           
        
        <Separator/>
                <div>
                    
                  <CardTitle className="font-semibold">Business hours</CardTitle>
                    <div className="mt-2 grid md:grid-cols-2 gap-1">
                        {availability.map((item) => {
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

                   <Separator/>

                <div className="mt-5">
    <CardTitle className="font-semibold">Services</CardTitle>
    <div className="space-y-2 mt-2">
    {services.map((service)=>{
        return (
            <Card key={service.id} className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription hidden={service.description == ""}>{service.description}</CardDescription>
                </CardHeader>

                <CardContent>

    <div key={service.id} className="space-y-1">
            <div className="flex gap-10">
        <p><span className="font-semibold">Duration:</span> {service.duration_minutes} minutes</p>
                <p><span className="font-semibold">Price:</span> {convertToMoney(service.price)}</p>
                </div>
        
            </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                    <Button variant={"secondary"}>Remove</Button>
                </CardFooter>

            </Card>
            
            
        
        )
    })}
    </div>

                </div>

          


            </CardContent>

            <CardFooter className="flex justify-end">
                <Button>Save and Publish</Button>
            </CardFooter>

        </Card>
    )
}