
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StepForward } from "lucide-react"

export default function HowToCard(){
    return <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>
            <div>
                <div className="flex items-center gap-0.5">
                <StepForward size={15} />
                <p>Step 1</p>
                </div>
               
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </CardTitle>
        <CardDescription>
          This card uses the small size variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The card component supports a size prop that can be set to
          &quot;sm&quot; for a more compact appearance.
        </p>
      </CardContent>

    </Card>
}