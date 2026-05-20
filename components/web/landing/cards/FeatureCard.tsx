import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string,
  description: string,

}

export default function FeatureCard({title, description}: Props){
    return <Card size="sm" className="w-full max-w-xs"  >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
 

    </Card>
}