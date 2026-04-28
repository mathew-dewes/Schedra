import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerCard(){
    return (
           <Card className="w-full">
            <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>Total: 24</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="font-semibold">
                    <p>+3 this week (later feature)</p>
            
            
                </div>

            </CardContent>
        </Card>
    )
}