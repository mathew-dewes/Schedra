import { getCategories } from "@/lib/db/queries/categories"

export default async function page(){

    const categories = await getCategories();

    console.log(categories);
    
    return (
        <div>
            <p>Categories page</p>
        </div>
    )
}