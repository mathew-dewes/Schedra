import { getCategories } from "@/lib/db/queries/categories"
import { CategoryTable } from "./_components/tables/CategoryTable";
import { CategoryColumns } from "./_components/tables/CategoryColumns";
import { CategoryType } from "@/lib/db/types";

export default async function page(){

    const categories = await getCategories() as CategoryType[];
    
    return (
        <div>
            <p>Categories page</p>
             <CategoryTable columns={CategoryColumns} data={categories} />
        </div>
    )
}
