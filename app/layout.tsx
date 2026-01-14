import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sports Event Dashboard",
  description: "Ministry of Education, Youth and Sport - Event Management",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`font-sans antialiased bg-slate-50/50`}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <React.Suspense fallback={<div /> }>
              <AppSidebar />
            </React.Suspense>
            <div className="flex-1 flex flex-col min-w-0">{children}</div>
          </div>
        </SidebarProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
