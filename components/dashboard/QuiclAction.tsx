import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"

export function QuickActions() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
      <Card className="bg-[#10b981] border-none shadow-lg shadow-emerald-100 rounded-[1.5rem] p-6 text-white overflow-hidden relative group cursor-pointer">
        <div className="relative z-10 flex flex-col gap-1">
          <p className="text-lg font-bold">Export Data</p>
          <p className="text-white/80 text-xs">Download reports in CSV format</p>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
          <Download className="h-5 w-5" />
        </div>
      </Card>
    </div>
  )
}
