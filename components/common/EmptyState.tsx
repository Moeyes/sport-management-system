import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Inbox } from "lucide-react"

type Props = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title = "No items yet", description = "There is nothing to show here.", actionLabel, onAction, }: Props) {
  return (
    <Card className="border-none shadow-sm rounded-2xl">
      <CardContent className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full bg-slate-50 p-4">
          <Inbox className="h-6 w-6 text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-[40ch]">{description}</p>
        {actionLabel && onAction && (
          <Button className="mt-2" onClick={onAction}>{actionLabel}</Button>
        )}
      </CardContent>
    </Card>
  )
}

export default EmptyState
