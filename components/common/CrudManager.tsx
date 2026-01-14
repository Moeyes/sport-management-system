"use client"

import { useState } from "react"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"

type CreateCompProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (item: any) => void
}

type EditCompProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any | null
  onSave: (item: any) => void
}

type RenderListProps = {
  items: any[]
  onEditRequested: (item: any) => void
  onDeleteRequested: (id: string) => void
  openCreate: () => void
}

type Props = {
  initialItems: any[]
  idKey?: string
  renderList: (props: RenderListProps) => React.ReactNode
  CreateComponent: React.ComponentType<CreateCompProps>
  EditComponent?: React.ComponentType<EditCompProps>
  onCreate?: (item: any) => void
  onEdit?: (item: any) => void
  onDelete?: (id: string) => void
}

export function CrudManager({ initialItems, idKey = "id", renderList, CreateComponent, EditComponent, onCreate, onEdit, onDelete, }: Props) {
  const [items, setItems] = useState<any[]>(initialItems)
  const [createOpen, setCreateOpen] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState<string | null>(null)

  function handleCreate(item: any) {
    setItems((prev) => [item, ...prev])
    onCreate?.(item)
  }

  function handleSave(item: any) {
    setItems((prev) => prev.map((p) => (p[idKey] === item[idKey] ? item : p)))
    onEdit?.(item)
  }

  function requestDelete(id: string) {
    setToDeleteId(id)
    setConfirmOpen(true)
  }

  function confirmDelete() {
    if (!toDeleteId) return
    setItems((prev) => prev.filter((p) => p[idKey] !== toDeleteId))
    onDelete?.(toDeleteId)
    setToDeleteId(null)
    setConfirmOpen(false)
  }

  function cancelDelete() {
    setToDeleteId(null)
    setConfirmOpen(false)
  }

  return (
    <div>
      <CreateComponent open={createOpen} onOpenChange={setCreateOpen} onCreate={(i) => { handleCreate(i); setCreateOpen(false) }} />

      {EditComponent && (
        <EditComponent open={Boolean(editing)} onOpenChange={(v) => { if (!v) setEditing(null) }} item={editing} onSave={(i) => { handleSave(i); setEditing(null) }} />
      )}

      <ConfirmDialog open={confirmOpen} onOpenChange={(v) => { if (!v) cancelDelete(); setConfirmOpen(v) }} title="Delete item" description="This action cannot be undone." onConfirm={confirmDelete} />

      {renderList({ items, onEditRequested: (i) => setEditing(i), onDeleteRequested: (id: string) => requestDelete(id), openCreate: () => setCreateOpen(true) })}
    </div>
  )
}

export default CrudManager
