import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { buttonVariants } from "@/components/ui/button";

export default function Login({ demo = false }:
    { demo: boolean }
) {
    return (<div className="flex mt-10 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
            <LoginForm credentials={{
                email: demo ? process.env.DEMO_EMAIL! : "" ,
                password: demo ? process.env.DEMO_PASSWORD! : "" 
            }} demo={demo} />

        </div>
        <div hidden={demo} className="mt-5 text-center">
            <p>What to see a demo? Click the button below.</p>
            <Link className={buttonVariants({ size: "lg", className: "animate-bounce mt-5" })} href={'/login?demo=true'}>View Demo</Link>

        </div>
    </div>)
}