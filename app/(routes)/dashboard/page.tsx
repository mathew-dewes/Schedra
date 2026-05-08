import Welcome from "./_components/Welcome";
import Actions from "./_components/Actions";

import Critical from "./_components/critical/Critical";
import Upcoming from "./_components/upcoming/Upcoming";
import Overview from "./_components/overview/Overview";


export default async function page() {


        return (
            <div className="space-y-10">
                <Actions />
                <Welcome />
                <Critical/>
                <Upcoming/>
                <Overview/>
            </div>
        )

    


}