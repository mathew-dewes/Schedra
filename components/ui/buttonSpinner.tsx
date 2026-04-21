import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonSpinner({text}:{text: string}) {
  return (
   <Button variant="secondary" disabled>
        {text}
        <Spinner data-icon="inline-start" />
      </Button>
  )
}
