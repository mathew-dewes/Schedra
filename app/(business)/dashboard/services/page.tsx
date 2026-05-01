
import { Suspense } from "react"
import Services from "./_components/Services"



export default function page(){

    return (
        <div>
            <Suspense fallback="Loading services...">
    <Services/>
            </Suspense>

        </div>
  
    )
}