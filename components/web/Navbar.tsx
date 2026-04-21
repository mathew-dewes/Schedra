import { createClientForServer } from "@/lib/supabase/server";
import NavLinks from "./NavLinks";

export default async function Navbar() {

    const supabase = await createClientForServer();
    
    
  const { data } = await supabase.auth.getSession();

  const session = data.session;

    
    return (
        <div className="flex justify-between mx-20 my-5">
            <h1 className="font-semibold">Schedra</h1>
      <NavLinks session={!!session}/>
        </div>
    )
}