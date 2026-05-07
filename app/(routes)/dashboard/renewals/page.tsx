import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { RenewalTable } from "./_components/tables/RenewalTable";
import { RenewalColumns } from "./_components/tables/RenewalColumns";
import { ArrowLeftIcon } from "lucide-react";

export default function page(){
    return (
          <div>
      <div className="flex gap-2">
        <Link className={buttonVariants({ variant: "secondary" })} href={'/dashboard'}><ArrowLeftIcon /></Link>
        <Link className={buttonVariants()} href={'/dashboard/renewals/new'}>+ Add Renewal</Link>

      </div>

      <RenewalTable columns={RenewalColumns} data={[]} />
    </div>
    )
}