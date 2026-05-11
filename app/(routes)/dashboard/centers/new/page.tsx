import { buttonVariants } from "@/components/ui/button";
import CenterForm from "./_components/CenterForm";
import Link from "next/link";
import ReturnToDash from "../../_components/buttons/ReturnToDash";

export default function page() {
    return (
        <div>
            <div className="flex gap-2">
                <ReturnToDash />
                <Link className={buttonVariants()} href={'/dashboard/vehicles'}>View Service Centers</Link>

            </div>
            <CenterForm />
        </div>
    )
}