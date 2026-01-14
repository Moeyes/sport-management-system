"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function PhotoUpload({
  file,
  onChange,
}: {
  file: File | null
  onChange: (file: File | null) => void
}) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (f: File) => {
    onChange(f)
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="space-y-4">
      <div className="w-32 h-32 rounded-full bg-slate-100 overflow-hidden">
        {preview && <img src={preview} className="w-full h-full object-cover" />}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="photo-upload"
        onChange={e => e.target.files && handleFile(e.target.files[0])}
      />

      <label htmlFor="photo-upload">
        <Button variant="outline">Upload Photo</Button>
      </label>
    </div>
  )
}
