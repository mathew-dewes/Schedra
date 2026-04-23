import { getBusinessServices } from "@/lib/db/queries/service";
import ServiceCard from "./cards/ServiceCard";

export default async function SavedServices({business_id}:
    {business_id: string}
){

        const savedServices = await getBusinessServices(business_id);
        const services = savedServices.services;
    return (
        <div className="space-y-5">
            <h2 className="font-semibold">Saved services:</h2>
        {services?.map((service)=>{
            return    <ServiceCard title={service.name} desc={service.description} key={service.id}/>
        })}
         
        
        </div>
    )
}