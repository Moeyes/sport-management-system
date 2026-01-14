"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	title?: string
	description?: string
	confirmLabel?: string
	cancelLabel?: string
	onConfirm: () => void
}

export function ConfirmDialog({ open, onOpenChange, title = "Are you sure?", description = "This action cannot be undone.", confirmLabel = "Delete", cancelLabel = "Cancel", onConfirm, }: Props) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-red-100 p-2">
							<AlertTriangle className="h-5 w-5 text-red-600" />
						</div>
						<div>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<DialogFooter>
					<Button variant="ghost" onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
					<Button variant="destructive" onClick={() => { onConfirm(); onOpenChange(false) }}>{confirmLabel}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmDialog
