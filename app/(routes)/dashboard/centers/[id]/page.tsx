import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import UpdateCenterForm from "./_components/UpdateCenterForm";


export default function page() {
    return (
        <div>
            <div className="flex gap-2">
           <Link 
    className={buttonVariants({ variant: "secondary" })} 
    href={'/dashboard/centers'}>
        <ArrowLeftIcon />Return to Centers</Link>
    
            </div>
            <UpdateCenterForm/>
    
        </div>
    )
}