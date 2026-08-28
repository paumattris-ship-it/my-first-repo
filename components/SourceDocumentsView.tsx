"use client";

import React, { useState } from "react";
import { FileText, Upload, Search, Trash2 } from "lucide-react";
import { SourceDocument, Subject } from "@/lib/types";

interface SourceDocumentsViewProps {
  documents: SourceDocument[];
  subjects: Subject[];
  onDelete: (id: number) => void;
  onUpload: (doc: Omit<SourceDocument, "id">) => void;
}

const typeIcons: Record<string, string> = {
  pdf: "📕",
  docx: "📘",
  txt: "📄",
  pptx: "📙",
};

const typeColors: Record<string, string> = {
  pdf: "bg-red-100 text-red-700",
  docx: "bg-blue-100 text-blue-700",
  txt: "bg-slate-100 text-slate-700",
  pptx: "bg-amber-100 text-amber-700",
};

export function SourceDocumentsView({
  documents,
  subjects,
  onDelete,
}: SourceDocumentsViewProps) {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState<number | null>(null);

  const filtered = documents.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = filterSubject ? d.subjectId === filterSubject : true;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <select
          value={filterSubject || ""}
          onChange={(e) => setFilterSubject(Number(e.target.value) || null)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Upload size={16} />
          Upload
        </button>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wide border-b">
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Subject</div>
          <div className="col-span-2">Uploaded</div>
          <div className="col-span-1"></div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <FileText size={48} className="mx-auto mb-3 opacity-50" />
            <p>No documents found.</p>
          </div>
        ) : (
          filtered.map((doc) => {
            const subject = subjects.find((s) => s.id === doc.subjectId);
            return (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 px-5 py-3 items-center border-b last:border-b-0 hover:bg-slate-50 transition-colors"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <span className="text-xl">{typeIcons[doc.type]}</span>
                  <div>
                    <div className="font-medium text-slate-800 text-sm">
                      {doc.title}
                    </div>
                    <div className="text-xs text-slate-400">{doc.size}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      typeColors[doc.type]
                    }`}
                  >
                    {doc.type.toUpperCase()}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-slate-600">
                  {subject?.name}
                </div>
                <div className="col-span-2 text-sm text-slate-500">
                  {doc.uploadedAt}
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
