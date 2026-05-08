import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DueSoonRenewals(){
    return (
           <Card className="w-full">
            <CardHeader>
                <CardTitle>Due soon renewals</CardTitle>
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