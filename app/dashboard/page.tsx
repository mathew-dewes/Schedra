
import { Suspense } from "react";
import OnBoardingSummary from "./_components/OnBoardingSummary";



export default async function page() {

    return (
        <div>
            <Suspense fallback="Loading data">
        <OnBoardingSummary/>
            </Suspense>
  
        </div>
    )
}