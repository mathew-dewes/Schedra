import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import UpdateCenterForm from "./_components/UpdateCenterForm";
import { getServiceCenter } from "@/lib/db/queries/centers";
import { CenterEntry } from "@/lib/types/entries";


type Props = {
    params: Promise<{ id: string }>
}

export default async function page({params}: Props) {
        const { id: center_id } = await params;

        const center = await getServiceCenter(center_id) as CenterEntry;
    return (
        <div>
            <div className="flex gap-2">
           <Link 
    className={buttonVariants({ variant: "secondary" })} 
    href={'/dashboard/centers'}>
        <ArrowLeftIcon />Return to Centers</Link>
    
            </div>
            <UpdateCenterForm center={center} center_id={center_id}/>
    
        </div>
    )
}