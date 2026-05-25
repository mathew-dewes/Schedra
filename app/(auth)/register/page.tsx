import { buttonVariants } from "@/components/ui/button";
import { RegisterForm } from "./_components/RegisterForm";
import Link from "next/link";

export default function page(){
    return (
         <div className="flex mt-10 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
              <div className="w-full max-w-sm">
                <RegisterForm />
              </div>
                      <div className="mt-5 text-center">
            <p>What to see a demo? Click the button below.</p>
            <Link className={buttonVariants({ size: "lg", className: "animate-bounce mt-5" })} href={'/login?demo=true'}>View Demo</Link>

        </div>
            </div>
    )
}