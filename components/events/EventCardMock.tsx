// @ts-nocheck
// // "use client"

// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { CalendarDays, ChevronRight } from "lucide-react"
// // import type { Event } from "@/src/types"

// // interface EventCardProps {
// //   event: Event
// //   onClick?: () => void
// // }

// // export function EventCard({ event, onClick }: EventCardProps) {
// //   const defaultHref = `/events/${event.id}`

// //   // If an explicit onClick is provided, keep the card interactive via onClick.
// //   // Otherwise render it as a link to the event detail page.
// //   const content = (
// //     <Card
// //       className="group cursor-pointer hover:shadow-md transition-all border border-slate-200 bg-slate-50 shadow-sm"
// //       onClick={onClick}
// //     >
// //       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //         <CardTitle className="text-lg font-bold text-slate-800">{event.name}</CardTitle>
// //         <div className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
// //           <ChevronRight className="h-4 w-4" />
// //         </div>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="flex items-center space-x-2 text-[12px] font-medium text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg w-fit">
// //           <CalendarDays className="h-3.5 w-3.5 text-blue-500" />
// //           <span>
// //             {event.startDate} - {event.endDate}
// //           </span>
// //         </div>
// //         <div className="flex flex-wrap gap-2 pt-2 border-t">
// //           {event.sports.map((sport) => (
// //             <Badge
// //               key={sport}
// //               variant="secondary"
// //               className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-[10px] font-bold px-3"
// //             >
// //               {sport}
// //             </Badge>
// //           ))}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )

// //   if (onClick) return content

// //   return (
// //     <a href={defaultHref} aria-label={`Open ${event.name}`}>
// //       {content}
// //     </a>
// //   )
// // }


// import { motion } from "framer-motion";
// import { Calendar, ChevronRight } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useLocation } from "wouter";

// export function EventCard({ event, index, onClick }: { event: any; index: number; onClick?: () => void }) {
//   const [, setLocation] = useLocation();

//   const handleClick = () => {
//     if (onClick) return onClick();
//     setLocation(`/register/${event.id}`);
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       onClick={handleClick}
//       className="cursor-pointer"
//     >
//       <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg">
//         <CardContent className="p-8 space-y-6">
//           <h3 className="text-3xl font-bold">{event.title}</h3>
//           <div className="inline-flex h-12 w-full items-center justify-between rounded-full bg-secondary/50 px-4">
//             <span className="text-sm font-medium text-primary">Join Event</span>
//             <div className="h-8 w-8 bg-background rounded-full flex items-center justify-center shadow-sm">
//               <ChevronRight className="h-4 w-4 text-primary" />
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <Calendar className="h-5 w-5" />
//             <span>{event.startDate} - {event.endDate}</span>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }