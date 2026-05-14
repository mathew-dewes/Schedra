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
 <Link className={buttonVariants({size: "lg", className:"mt-10 animate-bounce"})} href={'/login?demo=true'}>View Demo</Link>

            </div>

           
           <div className="text-center mt-15">
            <h2 className="font-medium text-lg">To get started you must login or register.</h2>
  <div className="flex justify-center gap-3 mt-5">
                <Link className={buttonVariants({size: "lg", variant:"secondary", className: "w-20"})} href={'/login'}>Login</Link>
                <Link className={buttonVariants({size: "lg", variant:"secondary", className: "w-20"})} href={'/register'}>Register</Link>
       
            </div>
           </div>
          

        </section>
    )
}