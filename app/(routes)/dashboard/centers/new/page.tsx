import { buttonVariants } from "@/components/ui/button";
import CenterForm from "./_components/CenterForm";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function page(){
    return (
        <div>
                                  <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/vehicles'}>View Service Centers</Link>
        
            </div>
            <CenterForm/>
        </div>
    )
}