"use client";

import React, { useState } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
import { Reviewer, Subject } from "@/lib/types";

interface AllReviewersViewProps {
  reviewers: Reviewer[];
  subjects: Subject[];
  onSelectReviewer: (id: number) => void;
}

export function AllReviewersView({
  reviewers,
  subjects,
  onSelectReviewer,
}: AllReviewersViewProps) {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState<number | null>(null);

  const filtered = reviewers.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = filterSubject ? r.subjectId === filterSubject : true;
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
            placeholder="Search reviewers..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={filterSubject || ""}
            onChange={(e) => setFilterSubject(Number(e.target.value) || null)}
            className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <div className="text-sm text-slate-500">
        Showing {filtered.length} of {reviewers.length} reviewers
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => {
          const subject = subjects.find((s) => s.id === r.subjectId);
          return (
            <button
              key={r.id}
              onClick={() => onSelectReviewer(r.id)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-indigo-200 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: (subject?.color || "#6366f1") + "20" }}
                >
                  <BookOpen
                    size={20}
                    style={{ color: subject?.color || "#6366f1" }}
                  />
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: (subject?.color || "#6366f1") + "20",
                    color: subject?.color || "#6366f1",
                  }}
                >
                  {subject?.code}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                {r.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>{r.flashcardCount} flashcards</span>
                <span>{r.quizCount} quizzes</span>
                <span className="ml-auto">Updated {r.updatedAt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <BookOpen size={48} className="mx-auto mb-3 opacity-50" />
          <p>No reviewers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
