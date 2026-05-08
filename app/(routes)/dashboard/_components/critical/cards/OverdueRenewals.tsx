import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverdueRenewals(){
    return (
           <Card className="w-full">
            <CardHeader>
                <CardTitle>Overdue Renewals</CardTitle>
                <CardDescription>3 renewals overdue</CardDescription>
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