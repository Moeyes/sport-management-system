"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import { EditSportDialog } from "@/components/sports/edit-sport-dialog";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import SearchTableWrapper from "@/components/common/SearchTableWrapper";
import type { SportRecord } from "@/types";
import { useMemo, useState } from "react";

export function SportTable({
  sports,
  onEdit,
  onDelete,
  onCreate,
}: {
  sports: SportRecord[];
  onEdit?: (s: SportRecord) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
}) {
  const [editing, setEditing] = useState<SportRecord | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(sports.map((s) => s.category))),
    [sports]
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  function handleDeleteRequested(id: string) {
    setToDeleteId(id);
    setConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (toDeleteId) {
      onDelete?.(toDeleteId);
      setToDeleteId(null);
      setConfirmOpen(false);
    }
  }

  function cancelDelete() {
    setToDeleteId(null);
    setConfirmOpen(false);
  }

  function startEdit(s: SportRecord) {
    setEditing(s);
  }

  function cancelEdit() {
    setEditing(null);
  }

  function submitEdit(updated: SportRecord) {
    onEdit?.(updated);
    setEditing(null);
  }

  return (
    <div>
      <EditSportDialog
        open={Boolean(editing)}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        item={editing}
        onSave={(updated) => submitEdit(updated)}
      />

      <div className="card border-none shadow-sm rounded-2xl p-6 space-y-6">
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={(v) => {
            if (!v) cancelDelete();
            setConfirmOpen(v);
          }}
          title="Delete sport"
          description="Deleting this sport will remove it from the list. This action cannot be undone."
          onConfirm={handleConfirmDelete}
        />

        <SearchTableWrapper
          statusOptions={["Ongoing", "Completed", "Upcoming"]}
          categoryOptions={categories}
        >
          {({
            query,
            setQuery,
            status: st,
            setStatus,
            category: cat,
            setCategory,
          }) => {
            const filtered = sports.filter((s) => {
              if (query && !s.name.toLowerCase().includes(query.toLowerCase()))
                return false;
              if (st && s.status !== st) return false;
              if (cat && s.category !== cat) return false;
              return true;
            });

            return (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead colSpan={5} className="p-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-800">Sports List ({filtered.length})</h3>

                          <button type="button" onClick={() => onCreate?.()} aria-label="Add sport" className="bg-[#1a4cd8] hover:bg-blue-700 rounded-xl gap-2 h-11 inline-flex items-center px-4 text-white cursor-pointer">
                              <Plus className="h-4 w-4" /> <span>Add Sport</span>
                            </button>
                        </div>
                      </TableHead>
                    </TableRow>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">
                        Sport Name
                      </TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">
                        Category
                      </TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">
                        Participants
                      </TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">
                        Status
                      </TableHead>
                      <TableHead className="font-bold text-[10px] uppercase text-slate-400">
                        Actionsx
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-bold text-slate-700">
                          {s.name}
                        </TableCell>
                        <TableCell className="text-slate-500 font-medium">
                          {s.category}
                        </TableCell>
                        <TableCell className="text-slate-500 font-medium">
                          {s.participants}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`rounded-lg px-3 py-1 text-[10px] border-none ${
                              s.status === "Completed"
                                ? "bg-slate-100 text-slate-600"
                                : s.status === "Ongoing"
                                ? "bg-blue-500 text-white"
                                : "bg-indigo-500 text-white"
                            }`}
                          >
                            {s.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(s)}
                              title="Edit"
                              className="text-slate-400 hover:text-slate-700"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRequested(s.id)}
                              title="Delete"
                              className="text-slate-400 hover:text-slate-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            );
          }}
        </SearchTableWrapper>
      </div>
    </div>
  );
}

export default SportTable;
