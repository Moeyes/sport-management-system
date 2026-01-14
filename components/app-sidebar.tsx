"use client"

import { LayoutDashboard, Trophy, Users, Medal, Map, PlusCircle, ChevronDown, Calendar } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSearchParams, usePathname } from "next/navigation"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useEvents } from "@/hooks/useEvents"

export function AppSidebar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Hide sidebar for the public registration route
  if (pathname === "/register") return null

  const currentView = searchParams.get("view") || "dashboard"
  const eventId = searchParams.get("event")
  const [isEventOpen, setIsEventOpen] = useState(!!eventId)

  const isEventViewActive =
    !!eventId && (currentView === "athletes" || currentView === "medals" || currentView === "provinces")

  const { events: eventList, loading: eventsLoading } = useEvents()

  return (
    <Sidebar className="border-r border-border bg-[#1a4cd8] text-white">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Trophy className="h-6 w-6 text-[#1a4cd8]" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">MOEYS Sport</h2>
            <p className="text-[10px] text-white/70 uppercase tracking-wider">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="mb-4">
          <p className="px-4 py-2 text-[10px] font-bold text-white/50 uppercase tracking-widest">Navigation</p>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentView === "dashboard" && !eventId}
                tooltip="Dashboard"
                className="text-white hover:bg-white/10 data-[active=true]:bg-white/20 rounded-xl"
              >
                <a href="/?view=dashboard">
                  <LayoutDashboard /> <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible open={isEventOpen} onOpenChange={setIsEventOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="text-white hover:bg-white/10 w-full justify-between rounded-xl data-[state=open]:bg-white/10"
                    tooltip="Events"
                    isActive={isEventViewActive}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> <span>Events</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isEventOpen ? "rotate-180" : ""}`} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l border-white/20 ml-4 mt-1 space-y-1">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="text-white/80 hover:text-white hover:bg-white/10"
                        isActive={!!eventId && currentView === "athletes"}
                      >
                        <a href={`/?event=${eventId || "1"}&view=athletes`}>
                          <Users className="h-3.5 w-3.5" /> <span>Athletes</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="text-white/80 hover:text-white hover:bg-white/10"
                        isActive={!!eventId && currentView === "medals"}
                      >
                        <a href={`/?event=${eventId || "1"}&view=medals`}>
                          <Medal className="h-3.5 w-3.5" /> <span>Medals</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="text-white/80 hover:text-white hover:bg-white/10"
                        isActive={!!eventId && currentView === "provinces"}
                      >
                        <a href={`/?event=${eventId || "1"}&view=provinces`}>
                          <Map className="h-3.5 w-3.5" /> <span>Provinces</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                  {!eventsLoading && eventList.length > 0 && (
                    <div className="mt-3 ml-4 border-l border-white/10 pl-3 space-y-1">
                      {eventList.map((ev) => (
                        <SidebarMenuSubItem key={ev.id}>
                          <SidebarMenuSubButton
                            asChild
                            className={`text-white/80 hover:text-white hover:bg-white/10 ${pathname === `/events/${ev.id}` ? "bg-white/10 text-white" : ""}`}
                          >
                            <a href={`/events/${ev.id}`}>{ev.name}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </div>
                  )}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentView === "sports"}
                tooltip="Sports"
                className="text-white hover:bg-white/10 rounded-xl"
              >
                <a href="/?view=sports">
                  <Trophy className="h-4 w-4" /> <span>Sports</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentView === "athletes" && !eventId}
                tooltip="Athletes"
                className="text-white hover:bg-white/10 rounded-xl"
              >
                <a href="/?view=athletes">
                  <Users className="h-4 w-4" /> <span>Athletes</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentView === "medals" && !eventId}
                tooltip="Medals"
                className="text-white hover:bg-white/10 rounded-xl"
              >
                <a href="/?view=medals">
                  <Medal className="h-4 w-4" /> <span>Medals</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={currentView === "provinces" && !eventId}
                tooltip="Provinces"
                className="text-white hover:bg-white/10 rounded-xl"
              >
                <a href="/?view=provinces">
                  <Map className="h-4 w-4" /> <span>Provinces</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <Button asChild className="w-full justify-start gap-2 bg-white text-[#1a4cd8] hover:bg-white/90 mb-4 rounded-xl font-bold" size="sm">
          <a href="/register-enroll">
            <PlusCircle className="h-4 w-4" />
            <span>Register Athlete</span>
          </a>
        </Button>
        <div className="flex items-center gap-3 px-2 py-4 bg-white/10 rounded-2xl">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">AU</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate">Admin User</p>
            <p className="text-[10px] text-white/50 truncate">admin@moeys.gov.kh</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
