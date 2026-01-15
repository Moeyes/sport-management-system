"use client"

import { useEffect, useId, useState, useRef } from "react"
import { Button } from "@/components/ui/button"

/**
 * Resize an image file to cover a 4x6 frame (600x900 px)
 */
async function resizeTo4x6(file: File, width = 600, height = 900): Promise<File> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Cover behavior: scale to fill and crop center
  const scale = Math.max(width / bitmap.width, height / bitmap.height)
  const drawWidth = bitmap.width * scale
  const drawHeight = bitmap.height * scale
  const dx = (width - drawWidth) / 2
  const dy = (height - drawHeight) / 2

  ctx.drawImage(bitmap, dx, dy, drawWidth, drawHeight)

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92))
  if (!blob) throw new Error('Failed to resize image')
  return new File([blob], `${Date.now()}-photo.jpg`, { type: 'image/jpeg' })
}

export function PhotoUpload({
  file,
  onChange,
}: {
  file: File | null
  onChange: (file: File | null) => void
}) {
  const id = useId()
  const inputId = `photo-upload-${id}`
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // set preview if file prop provided (e.g., form reset)
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
    return
  }, [file])

  useEffect(() => {
    return () => {
      // cleanup when unmounting
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFile = async (f: File) => {
    try {
      // Resize client-side to 4x6 (600x900 px)
      const resized = await resizeTo4x6(f)
      onChange(resized)
      // revoke previous preview
      if (preview) URL.revokeObjectURL(preview)
      const url = URL.createObjectURL(resized)
      setPreview(url)
    } catch (err) {
      console.error('Failed to process image', err)
      onChange(f) // fallback to original
      if (preview) URL.revokeObjectURL(preview)
      const url = URL.createObjectURL(f)
      setPreview(url)
    }
  }

  return (
    <div className="space-y-4">
      <div className="w-32 h-48 rounded-sm bg-slate-100 overflow-hidden">
        {preview ? (
          <img src={preview} alt="រូបថតដែលបានផ្ទុកឡើង" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">គ្មានរូបថត</div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        id={inputId}
        onChange={(e) => {
          const f = e.currentTarget.files?.[0] ?? null
          if (f) handleFile(f)
        }}
      />

      <Button variant="outline" onClick={() => inputRef.current?.click()}>ផ្ទុកឡើងរូបថត (4x6)</Button>
    </div>
  )
}
