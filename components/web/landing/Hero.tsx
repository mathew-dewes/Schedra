import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="py-10">

            <div className="flex justify-center">
                <Badge>Now in Early Access</Badge>
            </div>


            <h1 className="font-bold text-center text-3xl mt-10">Schedra</h1>
            <div className="mt-5 text-center">
                <p className="font-semibold text-xl">Modern scheduling for workshops, fleets, and service businesses.</p>
                <p className="text-muted-foreground">Schedra helps businesses track vehicle renewals, manage bookings, and stay ahead of maintenance — without spreadsheets or messy paperwork.</p>
 
       <div className="text-center mt-15">
  <div className="flex justify-center gap-3 mt-5">
                <Link className={buttonVariants({size: "lg", className: "w-20"})} href={'/login'}>Login</Link>
                <Link className={buttonVariants({size: "lg", className: "w-20"})} href={'/register'}>Register</Link>
       
            </div>
           </div>
 
 <div className="mt-15">
    <p className="font-medium text-lg">What to see a demo? Click the button below.</p>
 <Link className={buttonVariants({size: "lg", className:"animate-bounce mt-5"})} href={'/login?demo=true'}>View Demo</Link>

 </div>

            </div>

           
     
          

        </section>
    )
}