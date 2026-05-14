
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StepForward } from "lucide-react";


type Props = {
  stepNumber: string,
  title: string,
  content: string
}

export default function HowToCard({stepNumber, title, content}: Props){
    return <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
            <div>
                <div className="flex items-center gap-0.5">
                <StepForward size={15} />
                <p>Step {stepNumber}</p>
                </div>
               
                <p>{title}</p>
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
         {content}
        </p>
      </CardContent>

    </Card>
}