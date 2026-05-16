
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type Props = {
  stepNumber: string,
  title: string,
  content: string
}

export default function HowToCard({stepNumber, title, content}: Props){
    return <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
            <div>
                <p className="text-xs mb-2">Step {stepNumber}</p>
             
               
                <p className="text-lg">{title}</p>
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
         {content}
        </p>
      </CardContent>

    </Card>
}