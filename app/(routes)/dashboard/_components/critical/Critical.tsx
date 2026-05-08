
import ActiveBreakdowns from "./cards/ActiveBreakDowns";
import DueSoonRenewals from "./cards/DueSoonRenewals";
import OverdueRenewals from "./cards/OverdueRenewals";

export default function Critical(){
    return (
        <div className="grid grid-cols-3 gap-5">
            <OverdueRenewals/>
            <DueSoonRenewals/>
            <ActiveBreakdowns/>
        </div>
    )
}