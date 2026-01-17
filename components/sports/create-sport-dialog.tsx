// @ts-nocheck
// "use client"

// import { useState } from "react"
// import { CreateEntityDialog } from "@/components/common/CreateEntityDialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import type { SportRecord, SportStatus } from "@/types"

// type Props = {
// 	open: boolean
// 	onOpenChange: (open: boolean) => void
// 	onCreate: (s: SportRecord) => void
// }

// export function CreateSportDialog({ open, onOpenChange, onCreate }: Props) {
// 	const [name, setName] = useState("")
// 	const [category, setCategory] = useState("")
// 	const [participants, setParticipants] = useState("")
// 	const [status, setStatus] = useState<SportStatus>("Ongoing")

// 	function handleSubmit(e: React.FormEvent) {
// 		e.preventDefault()
// 		const newSport: SportRecord = {
// 			id: String(Date.now()),
// 			name,
// 			category,
// 			participants: participants || "0",
// 			status,
// 		}
// 		onCreate(newSport)
// 		setName("")
// 		setCategory("")
// 		setParticipants("")
// 		setStatus("Ongoing")
// 	}

// 	return (
// 		<CreateEntityDialog open={open} onOpenChange={onOpenChange} title="Create Sport" description="Add a new sport to your program." onSubmit={handleSubmit} submitLabel="Create">
// 			<div className="grid gap-1">
// 				<label className="text-sm font-medium">Sport Name</label>
// 				<Input value={name} onChange={(e) => setName(e.target.value)} required />
// 			</div>
// 			<div className="grid gap-1">
// 				<label className="text-sm font-medium">Category</label>
// 				<Input value={category} onChange={(e) => setCategory(e.target.value)} required />
// 			</div>
// 			<div className="grid gap-1">
// 				<label className="text-sm font-medium">Participants</label>
// 				<Input value={participants} onChange={(e) => setParticipants(e.target.value)} type="number" />
// 			</div>
// 			<div className="grid gap-1">
// 				<label className="text-sm font-medium">Status</label>
// 				<select value={status} onChange={(e) => setStatus(e.target.value as SportStatus)} className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium">
// 					<option value="Ongoing">Ongoing</option>
// 					<option value="Completed">Completed</option>
// 					<option value="Upcoming">Upcoming</option>
// 				</select>
// 			</div>
// 		</CreateEntityDialog>
// 	)
// }

// export default CreateSportDialog
