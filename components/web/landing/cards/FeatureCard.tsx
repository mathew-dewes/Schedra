import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string,
  description: string,
  content: string
}

export default function FeatureCard({title, description, content}: Props){
    return <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {content}
        </p>
      </CardContent>

    </Card>
}