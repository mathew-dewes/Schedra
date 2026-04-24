import ServiceCard from "./cards/ServiceCard";
import { Services } from "@/lib/db/types";

export default async function SavedServices({services}:
    {services: Services}
){

    return (
        <div className="space-y-5">
            <h2 hidden={services.length == 0} className="font-semibold">Saved services:</h2>
        {services?.map((service)=>{
            return    <ServiceCard 
            key={service.id}
            id={service.id} 
            title={service.name} 
            desc={service.description} 
            price={service.price}
            duration={service.duration_minutes}
            />
        })}
         
        
        </div>
    )
}