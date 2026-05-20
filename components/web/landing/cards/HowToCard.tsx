
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type Props = {
  stepNumber: string,
  title: string,
  content: string
}

export default function HowToCard({stepNumber, title, content}: Props){
    return <Card size="sm"  className="w-full max-w-sm">
      <CardHeader>
              <CardDescription className="text-left">Step {stepNumber}</CardDescription>
        <CardTitle>
           {title}
        </CardTitle>
  
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
         {content}
        </p>
      </CardContent>

    </Card>
}