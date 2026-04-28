import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Alert(){
    return(
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Alert:</CardTitle>
                    <CardDescription>On boarding incomplete</CardDescription>
                </CardHeader>

                <CardContent>
                    You haven`t added any services yet
                </CardContent>
                <CardFooter>
                    <Button>Contiue setup</Button>
                </CardFooter>

            </Card>
        </div>
    )
}