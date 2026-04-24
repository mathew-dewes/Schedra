import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { getUserBusiness } from "@/lib/db/queries/business";
import { Business } from "@/lib/db/types";
import BusinessOverview from "./BusinessOverview";

export default async function OnBoardingSummary() {
    const business = await getUserBusiness() as Business;
    const services = business?.services ?? [];
    const hasBusiness = business !== null
    const hasService = services.length > 0
    
    return (
        <div>
            <div>
                <h1 className="text-xl font-semibold">Welcome to Schedra, Mathew</h1>
                <p className="mt-2">Let&apos;s get your business ready to take bookings:</p>
            </div>

            <div className="mt-10 space-y-8">
                <div className="flex items-center gap-2">
                    <Checkbox defaultChecked={hasBusiness} className="size-5 pointer-events-none" />
                    <h2>Create your business</h2>
                    <Link className={buttonVariants({ variant: "secondary" })} href={'/on-boarding/business'}>
                        {hasBusiness ? "Update" : "Complete"}</Link>

                </div>
                <div className="flex items-center gap-2">
                    <Checkbox defaultChecked={hasService} className="size-5 pointer-events-none" />
                    <h2>Add a service</h2>
                    {hasBusiness ?
                        <Link className={buttonVariants({ variant: "secondary" })} href={'/on-boarding/service'}>{hasService ? "Update" : "Complete"}</Link> :
                        <Button variant={"secondary"} disabled>{hasService ? "Update" : "Complete"}</Button>

                    }
                </div>
           
            </div>

            <div className="mt-10 max-w-xs space-y-2">
                <p>Progress: 0 / 3 completed</p>
                <Progress value={0} />
            </div>
            <BusinessOverview business={business} services={services} finalReview={hasBusiness && hasService}/>

        </div>
    )
}