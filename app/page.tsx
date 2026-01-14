import { Suspense } from "react"
import { redirect } from "next/navigation"
// import { DashboardContent } from "@/components/dashboard-content"

export default async function Page({ searchParams }: { searchParams?: Promise<{ view?: string; event?: string }> | { view?: string; event?: string } }) {
  const sp = await searchParams
  const view = sp?.view
  const event = sp?.event

  // // If the request is asking for dashboard-related content, render it here
  // if (view && ["dashboard", "athletes", "medals", "sports", "provinces"].includes(view)) {
  //   return (
  //     <Suspense fallback={null}>
  //       <DashboardContent />
  //     </Suspense>
  //   )
  // }

  // // If an event id is present, render the dashboard as well (event-scoped views use the same component)
  // if (event) {
  //   return (
  //     <Suspense fallback={null}>
  //       <DashboardContent />
  //     </Suspense>
  //   )
  // }

  // Otherwise, send users to the public registration page
  redirect('/register')
}
