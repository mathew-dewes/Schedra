
import { Button } from "@/components/ui/button"
import {
    Card,

    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Inspiration() {
    return (
        <section>
            <Card className="mx-auto w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-center">Inspiration</CardTitle>
                    <CardDescription>
                        Due to past experience in fleet operations, My team faced many challenges around scheduling vehicles with service providers and keeping track of upcoming renewals and vehicle statuses. I have developed Schedra in a way that solves these challenges by displaying and alerting key metrics around upcoming renewals and bookings eliminating the need for manual traceability.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full">View Github</Button>
            
                </CardFooter>
            </Card>

        </section>
    )
}