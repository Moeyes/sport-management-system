// import { Card } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Edit2, Trash2, Plus } from "lucide-react"
// import type { Event, Athlete, Medal } from "@/types"

// export function MedalTable({ medals, athletes, events, onCreate, onEdit, onDelete }: { medals: Medal[]; athletes: Athlete[]; events: Event[]; onCreate?: () => void; onEdit?: (m: Medal) => void; onDelete?: (id: string) => void }) {
// 	return (
// 		<Card className="border-none shadow-sm rounded-2xl p-6">
// 			<Table>
// 				<TableHeader>
// 					<TableRow>
// 						<TableHead colSpan={7} className="p-3">
// 							<div className="flex items-center justify-between">
// 								<h3 className="font-bold text-slate-800">Medal Awards ({medals.length})</h3>
// 								{onCreate && (
// 									<button type="button" onClick={() => onCreate?.()} className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11 inline-flex items-center px-4 text-white">
// 										<Plus className="h-4 w-4" /> <span>Add Medal</span>
// 									</button>
// 								)}
// 							</div>
// 						</TableHead>
// 					</TableRow>
// 					<TableRow className="bg-slate-50/50">
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Athlete</TableHead>
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Sport</TableHead>
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Event</TableHead>
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Province</TableHead>
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Medal Type</TableHead>
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Date</TableHead>
// 						<TableHead className="font-bold text-[10px] uppercase text-slate-400">Actions</TableHead>
// 					</TableRow>
// 				</TableHeader>
// 				<TableBody>
// 					{medals.map((medal) => {
// 						const athlete = athletes.find((a) => a.id === medal.athleteId)
// 						const event = events.find((e) => e.id === medal.eventId)
// 						return (
// 							<TableRow key={medal.id}>
// 								<TableCell className="font-bold">{athlete?.name || "N/A"}</TableCell>
// 								<TableCell className="text-slate-500">{medal.sport}</TableCell>
// 								<TableCell className="text-slate-500">{event?.name || "N/A"}</TableCell>
// 								<TableCell className="text-slate-500">{athlete?.province || "N/A"}</TableCell>
// 								<TableCell>
// 									<Badge className="border-none rounded-full px-3 py-1">
// 										{medal.medalType === "Gold" && "Gold"}
// 										{medal.medalType === "Silver" && "Silver"}
// 										{medal.medalType === "Bronze" && "Bronze"}
// 									</Badge>
// 								</TableCell>
// 								<TableCell className="text-slate-500">{medal.date}</TableCell>
// 								<TableCell>
// 									<div className="flex items-center gap-2">
// 										<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
// 											<Edit2 className="h-4 w-4" />
// 										</Button>
// 										<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600">
// 											<Trash2 className="h-4 w-4" />
// 										</Button>
// 									</div>
// 								</TableCell>
// 							</TableRow>
// 						)
// 					})}
// 				</TableBody>
// 			</Table>
// 		</Card>
// 	)
// }

// //