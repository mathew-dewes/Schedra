import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { navLinks, publicNavLinks } from "@/lib/constants";
import { createClientForServer } from "@/lib/supabase/server";

import SignOutButton from "./ActionButtons/SignOutButton";

export default async function Navbar() {

    const supabase = await createClientForServer();
    
    
  const { data } = await supabase.auth.getSession();

  const session = data.session

    console.log(session);
    
    return (
        <div className="flex justify-between mx-20 my-5">
            <h1 className="font-semibold">Schedra</h1>
            <ul className="flex items-center gap-3">
                {!session ? publicNavLinks.map((link) => {
                    return <Link
                        key={link.href}
                        className={buttonVariants({ variant: "outline" })} href={link.href}>{link.label}</Link>
                }) : navLinks.map((link) => {
                    return <Link
                        key={link.href}
                        className={buttonVariants({ variant: "outline" })} href={link.href}>{link.label}</Link>
                })}
              <SignOutButton/>




            </ul>
        </div>
    )
}