import { getCategories } from "@/lib/db/queries/categories"
import { CategoryTable } from "./_components/tables/CategoryTable";
import { CategoryColumns } from "./_components/tables/CategoryColumns";
import { CategoryType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default async function page(){

    const categories = await getCategories() as CategoryType[];
    
    return (
        <div>
                                <div className="flex gap-2">
 <Link className={buttonVariants({variant: "secondary"})} href={'/dashboard'}> <ArrowLeftIcon /></Link>
<Link className={buttonVariants()} href={'/dashboard/categories/new'}>+ Add Category</Link>
        
            </div>
             <CategoryTable columns={CategoryColumns} data={categories} />
        </div>
    )
}
