import { getRenewal } from "@/lib/db/queries/renewals";
import ReturnToDash from "../../../_components/buttons/ReturnToDash";
import UpdateRenewalForm from "./_components/UpdateRenewalForm";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { RenewalEntry } from "@/lib/types/entries";


type Props = {
    params: Promise<{ id: string }>
}

export default async function page({ params }: Props) {

    const { id: renewal_id } = await params;
    const renewal = await getRenewal(renewal_id) as RenewalEntry;

    return (
        <div>
            <div className="flex gap-2">
                <ReturnToDash />
                <Link className={buttonVariants()} href={'/dashboard/renewals'}>View Renewals</Link>
            </div>
            <UpdateRenewalForm renewal={renewal} renewal_id={renewal_id} />
        </div>
    )
}