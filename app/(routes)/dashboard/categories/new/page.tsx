import Link from "next/link";
import CategoryForm from "./_components/CategoryForm";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function page(){
    return (
        <div>
                                  <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/categories'}>View Categories</Link>
        
            </div>
        <CategoryForm/>
        </div>
    )
}