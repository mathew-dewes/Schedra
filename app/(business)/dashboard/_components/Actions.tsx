import { Button } from "@/components/ui/button";

export default function Actions(){
    return(
        <div>
            <h2 className="font-semibold">Quick Actions:</h2>
    <div className="flex gap-2 mt-2">
            <Button>+ New Booking</Button>
            <Button>+ Add Service</Button>
            <Button>+ Set Availability</Button>
            <Button>+ View Calendar</Button>
        </div>
        </div>
    
    )
}