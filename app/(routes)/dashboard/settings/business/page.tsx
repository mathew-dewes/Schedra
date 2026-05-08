import { buttonVariants } from "@/components/ui/button";
import BusinessForm from "./_components/BusinessForm";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function page(){
    return (
                <div>
            <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}><ArrowLeftIcon/> Return to Dashboard</Link>        
            </div>
               <BusinessForm/>
        </div>
    )
}