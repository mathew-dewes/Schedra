import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActiveServicesCard(){
    return (
           <Card className="w-full">
            <CardHeader>
                <CardTitle>Active Services</CardTitle>
                <CardDescription>3 services active</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-semibold">
                    <p>Matts Burgers</p>
                    <p>Matts Pies</p>
                    <p>Matts Pizzas</p>
            
                </div>

            </CardContent>
        </Card>
    )
}