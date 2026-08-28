"use client";

import React, { useState } from "react";
import { Plus, GraduationCap, BookOpen } from "lucide-react";
import { Subject } from "@/lib/types";

interface SubjectsViewProps {
  subjects: Subject[];
  onAdd: (subject: Omit<Subject, "id">) => void;
  onDelete: (id: number) => void;
}

const colorOptions = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export function SubjectsView({ subjects, onAdd, onDelete }: SubjectsViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState(colorOptions[0]);

  const handleAdd = () => {
    if (!name || !code) return;
    onAdd({ name, code, color, reviewerCount: 0 });
    setName("");
    setCode("");
    setColor(colorOptions[0]);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">{subjects.length} subjects</div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          Add Subject
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <h3 className="font-semibold text-slate-800">New Subject</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Subject Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chemistry"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. CHEM101"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Color
            </label>
            <div className="flex gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === c
                      ? "border-slate-800 scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!name || !code}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              Add Subject
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: subject.color + "20" }}
              >
                <GraduationCap size={24} style={{ color: subject.color }} />
              </div>
              <button
                onClick={() => onDelete(subject.id)}
                className="text-xs text-slate-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>

            <h3 className="font-semibold text-slate-800 mb-1">{subject.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{subject.code}</p>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BookOpen size={16} className="text-slate-400" />
              {subject.reviewerCount} reviewer{subject.reviewerCount !== 1 ? "s" : ""}
            </div>
          </div>
        ))}
      </div>

      {subjects.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <GraduationCap size={48} className="mx-auto mb-3 opacity-50" />
          <p>No subjects yet. Add your first subject to get started!</p>
        </div>
      )}
    </div>
  );
}
