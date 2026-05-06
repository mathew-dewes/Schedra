import { getCategories } from "@/lib/db/queries/categories"
import { CategoryTable } from "./_components/tables/CategoryTable";
import { CategoryColumns } from "./_components/tables/CategoryColumns";
import { CategoryType } from "@/lib/db/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function page(){

    const categories = await getCategories() as CategoryType[];
    
    return (
        <div>
           <Link className={buttonVariants({ size: "sm" })} href={'/dashboard/categories/new'}>+ Add Category</Link>
             <CategoryTable columns={CategoryColumns} data={categories} />
        </div>
    )
}
