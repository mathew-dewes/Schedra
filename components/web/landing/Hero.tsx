import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="py-10">

            <div className="flex justify-center">
                <Badge className="animate-bounce">Now in Early Access</Badge>
            </div>


            <h1 className="font-bold text-center md:text-3xl text-2xl mt-10">Schedra</h1>
            <div className="mt-5 text-center">
                <p className="font-semibold">Modern scheduling for workshops, fleets, and service businesses.</p>
                <p className="text-muted-foreground text-sm">Schedra helps businesses track vehicle renewals, manage bookings, and stay ahead of maintenance — without spreadsheets or messy paperwork.</p>
 
       <div className="text-center mt-15">
  <div className="flex justify-center gap-3 mt-5">
                <Link className={buttonVariants({className: "w-20", variant: "secondary"})} href={'/login'}>Login</Link>
                <Link className={buttonVariants({className: "w-20", variant: "secondary"})} href={'/register'}>Register</Link>
       
            </div>
           </div>
 
 <div className="mt-15">
    <p className="font-medium text-sm">What to see a demo? Click the button below.</p>
 <Link className={buttonVariants({size: "lg", className:"animate-bounce mt-5"})} href={'/login?demo=true'}>View Demo</Link>

 </div>

            </div>

           
     
          

        </section>
    )
}