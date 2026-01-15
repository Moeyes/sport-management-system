import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export function EventCard({ event, onClick }: { event: any; index: number; onClick?: () => void }) {
  const [, setLocation] = useLocation();
  const defaultHref = `/events/${event.id}`;

  const content = (
    <motion.div whileHover={{ y: -5 }} className="cursor-pointer">
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
          <CardTitle className="text-lg font-bold text-slate-800">{event.name ?? event.title}</CardTitle>
          <div className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ChevronRight className="h-4 w-4" />
          </div>
        </CardHeader>
        

        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">{event.startDate} - {event.endDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 pt-2">
              {(event.sports ?? []).map((sport: any) => {
                const sportName = typeof sport === "string" ? sport : sport?.name ?? String(sport);
                const key = typeof sport === "string" ? sport : sport?.id ?? sportName;
                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-[10px] font-bold px-3"
                  >
                    {sportName}
                  </Badge>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );


  if (onClick) {
    return (
      <div onClick={onClick} className="w-full">
        {content}
      </div>
    );
  }

  return (
    <a href={defaultHref} aria-label={`Open ${event.name ?? event.title}`}>
      {content}
    </a>
  );
}
