
import { checkBusiness } from "@/lib/db/queries/business";
import OnBoardingSummary from "./_components/OnBoardingSummary";


export default async function page() {

const hasBusiness = await checkBusiness() as boolean;

    
    return (
        <div>
          <OnBoardingSummary hasBusiness={hasBusiness} hasService={false}/>
        </div>
    )
}