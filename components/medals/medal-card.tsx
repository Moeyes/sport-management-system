import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export function MedalCard({ title, value, color, iconColor }: { title: string; value: number | string; color?: string; iconColor?: string }) {
	return (
		<Card className="border-none shadow-sm rounded-2xl">
			<CardContent className="p-6 flex items-center gap-4">
				<div className={`${color || "bg-purple-100"} p-3 rounded-xl`}>
					<Trophy className={`h-6 w-6 ${iconColor || "text-purple-600"}`} />
				</div>
				<div>
					<p className="text-xs text-muted-foreground font-medium uppercase">{title}</p>
					<p className="text-2xl font-bold">{value}</p>
				</div>
			</CardContent>
		</Card>
	)
}

