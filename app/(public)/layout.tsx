"use client"

import React, { type ReactNode } from "react"

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen p-8 bg-[#fafafa] flex items-center justify-center">
			<main className="w-full max-w-4xl">{children}</main>
		</div>
	)
}

