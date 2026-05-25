
import { CenterEntry } from "@/lib/types/entries";
import UpdateCenterFormClient from "./UpdateCenterFormClient";

export default async function UpdateCenterForm({center, center_id}:
    {center: CenterEntry, center_id: string}) {    

    return <UpdateCenterFormClient center={center} center_id={center_id}/>
    
}