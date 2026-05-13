import { getRenewal } from "@/lib/db/queries/renewals";
import ReturnToDash from "../../../_components/buttons/ReturnToDash";
import UpdateRenewalForm from "./_components/UpdateRenewalForm";
import { RenewalEntry } from "@/lib/types";


type Props = {
    params: Promise<{id: string}>
}

export default async function page({params}: Props){
     
    const { id: renewal_id } = await params;
    const renewal = await getRenewal(renewal_id) as RenewalEntry;

    return (
        <div>
            <ReturnToDash/>
            <UpdateRenewalForm renewal={renewal} renewal_id={renewal_id}/>
        </div>
    )
}