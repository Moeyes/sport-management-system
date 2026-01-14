export function DashboardBanner() {
  return (
    <div className="bg-[#1a4cd8] rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-3">Dashboard Overview</h2>
        <p className="text-white/80 text-lg">Welcome back! Here's what's happening with your sport events.</p>
      </div>
      <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-white/20">
        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10h10M7 6h10M7 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-medium">Tuesday, December 23, 2025</span>
      </div>
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
    </div>
  )
}
