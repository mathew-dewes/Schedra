import { ServiceTable } from "./ServiceTable"
import { ServiceColumns } from "./ServiceColumns"
import { getServices } from "@/lib/db/queries/service";
import { ServiceType } from "@/lib/db/types";



export default async function Services(){
  
      const services = await getServices() as ServiceType;

      
    return(
        <div>
              <ServiceTable columns={ServiceColumns} data={services} />
        </div>
    )
}