import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export default function OnBoardingSummary(){

    const hasBusiness = false;
    const hasService = false;
    return (
               <div>
            <div>
                <h1 className="text-xl font-semibold">Welcome to Schedra, Mathew</h1>
                <p className="mt-2">Let&apos;s get your business ready to take bookings:</p>
            </div>

            <div className="mt-10 space-y-8">
                <div className="flex items-center gap-2">
                    <Checkbox className="size-5 pointer-events-none" />
                    <h2>Create your business</h2>
                    <Link className={buttonVariants({variant:"secondary"})} href={'/on-boarding/business'}>Complete</Link>
            
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox className="size-5 pointer-events-none" />
                    <h2>Add a service</h2>
                    {hasBusiness ? 
                <Link className={buttonVariants({variant:"secondary"})} href={'/on-boarding/service'}>Complete</Link>:
                <Button variant={"secondary"} disabled>Complete</Button>
         
                }
                   </div>
                <div className="flex items-center gap-2">
                    <Checkbox className="size-5 pointer-events-none" />
                    <h2>Review details</h2>
                    {hasService && hasBusiness ?
                      <Link className={buttonVariants({variant:"secondary"})} href={'/on-boarding/review'}>Complete</Link>:
                      <Button variant={"secondary"} disabled>Complete</Button>
                }
              
                </div>
            </div>

              <div className="mt-10 max-w-xs space-y-2">
                    <p>Progress: 0 / 3 completed</p>
                    <Progress value={0} />
                </div>
         

            {/* <Services/> */}
        </div>
    )
}