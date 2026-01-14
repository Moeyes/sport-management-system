import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
	rows?: number
}

export function LoadingSkeleton({ rows = 5 }: Props) {
	return (
		<Card className="border-none shadow-sm rounded-2xl">
			<CardContent className="p-6 space-y-4">
				<div className="flex items-center justify-between">
					<div className="w-40">
						<Skeleton className="h-6 w-full rounded-xl" />
					</div>
					<div className="w-24">
						<Skeleton className="h-10 w-full rounded-xl" />
					</div>
				</div>

				<div className="space-y-3">
					{Array.from({ length: rows }).map((_, i) => (
						<div key={i} className="flex items-center gap-4">
							<Skeleton className="h-10 w-10 rounded-md" />
							<div className="flex-1">
								<Skeleton className="h-4 w-1/2 mb-2" />
								<Skeleton className="h-3 w-1/3" />
							</div>
							<Skeleton className="h-6 w-24 rounded-xl" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export default LoadingSkeleton
