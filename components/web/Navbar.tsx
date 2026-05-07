import { createClientForServer } from "@/lib/supabase/server";
import NavLinks from "./NavLinks";
import Link from "next/link";

export default async function Navbar() {

    const supabase = await createClientForServer();
    
    
  const { data } = await supabase.auth.getSession();
  const session = data.session;

    
    return (
        <div className="flex justify-between md:mx-10 lg:mx-20 mx-5 my-5">
            {session ? <Link href={'/dashboard'}><h1 className="font-semibold">Schedra</h1></Link>:
            <h1 className="font-semibold">Schedra</h1>}
   
       
      <NavLinks session={!!session}/>
        </div>
    )
}