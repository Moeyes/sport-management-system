"use client"

import { RegistrationForm } from "@/components/registration"

export default function RegisterPage() {
  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Athlete Registration</h1>
        <p className="text-sm text-muted-foreground mb-6">Bilingual form (English + Khmer) for participant registration</p>
        <RegistrationForm onSubmit={(data) => console.log("registered", data)} />
      </div>
    </div>
  )
}
