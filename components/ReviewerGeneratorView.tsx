"use client";

import React, { useState } from "react";
import { Sparkles, FileText, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import { SourceDocument, Subject } from "@/lib/types";

interface ReviewerGeneratorViewProps {
  documents: SourceDocument[];
  subjects: Subject[];
  onGenerate: (data: {
    title: string;
    subjectId: number;
    documentIds: number[];
    flashcardCount: number;
    quizCount: number;
  }) => void;
}

export function ReviewerGeneratorView({
  documents,
  subjects,
  onGenerate,
}: ReviewerGeneratorViewProps) {
  const [title, setTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  const [flashcardCount, setFlashcardCount] = useState(20);
  const [quizCount, setQuizCount] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const filteredDocs = selectedSubject
    ? documents.filter((d) => d.subjectId === selectedSubject)
    : documents;

  const toggleDoc = (id: number) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!title || !selectedSubject || selectedDocs.length === 0) return;
    setIsGenerating(true);
    setGenerated(false);

    // Simulate generation
    await new Promise((r) => setTimeout(r, 2500));

    onGenerate({
      title,
      subjectId: selectedSubject,
      documentIds: selectedDocs,
      flashcardCount,
      quizCount,
    });

    setIsGenerating(false);
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  };

  const canGenerate = title && selectedSubject && selectedDocs.length > 0 && !isGenerating;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles size={24} />
          <h2 className="text-2xl font-bold">Reviewer Generator</h2>
        </div>
        <p className="text-purple-100">
          Create comprehensive reviewers from your source documents. QuizCraft
          will generate flashcards and quizzes tailored to your material.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Reviewer Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Midterm Exam Reviewer"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Subject
          </label>
          <div className="relative">
            <select
              value={selectedSubject || ""}
              onChange={(e) => setSelectedSubject(Number(e.target.value) || null)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Source Documents */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Source Documents{" "}
            <span className="text-slate-400">({selectedDocs.length} selected)</span>
          </label>
          <div className="border border-slate-200 rounded-lg divide-y max-h-60 overflow-y-auto">
            {filteredDocs.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-400">
                {selectedSubject
                  ? "No documents for this subject."
                  : "Select a subject to see available documents."}
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${
                    selectedDocs.includes(doc.id) ? "bg-indigo-50" : ""
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedDocs.includes(doc.id)
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-slate-300"
                    }`}
                  >
                    {selectedDocs.includes(doc.id) && (
                      <svg viewBox="0 0 16 16" fill="white" className="w-3 h-3">
                        <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </div>
                  <FileText size={16} className="text-slate-400" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-700">{doc.title}</div>
                    <div className="text-xs text-slate-400">
                      {doc.type.toUpperCase()} · {doc.size}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Counts */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Flashcards to Generate
            </label>
            <input
              type="number"
              min={5}
              max={100}
              value={flashcardCount}
              onChange={(e) => setFlashcardCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Quizzes to Generate
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={quizCount}
              onChange={(e) => setQuizCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
            generated
              ? "bg-emerald-600 text-white"
              : canGenerate
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating reviewer...
            </>
          ) : generated ? (
            <>
              <CheckCircle2 size={18} />
              Reviewer Generated!
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Reviewer
            </>
          )}
        </button>
      </div>
    </div>
  );
}
