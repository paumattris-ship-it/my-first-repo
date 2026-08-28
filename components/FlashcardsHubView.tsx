"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Check, X, Layers } from "lucide-react";
import { Flashcard, Reviewer } from "@/lib/types";

interface FlashcardsHubViewProps {
  flashcards: Flashcard[];
  reviewers: Reviewer[];
  onUpdateStatus: (id: number, status: "unseen" | "learning" | "mastered") => void;
}

export function FlashcardsHubView({
  flashcards,
  reviewers,
  onUpdateStatus,
}: FlashcardsHubViewProps) {
  const [selectedReviewerId, setSelectedReviewerId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filtered = selectedReviewerId
    ? flashcards.filter((f) => f.reviewerId === selectedReviewerId)
    : flashcards;

  const current = filtered[currentIndex];
  const reviewer = current ? reviewers.find((r) => r.id === current.reviewerId) : null;

  const goNext = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i + 1) % filtered.length);
  };

  const goPrev = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i - 1 + filtered.length) % filtered.length);
  };

  const mastered = flashcards.filter((f) => f.status === "mastered").length;
  const learning = flashcards.filter((f) => f.status === "learning").length;
  const unseen = flashcards.filter((f) => f.status === "unseen").length;

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedReviewerId || ""}
          onChange={(e) => {
            setSelectedReviewerId(Number(e.target.value) || null);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Reviewers</option>
          {reviewers.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>

        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Mastered: {mastered}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Learning: {learning}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            Unseen: {unseen}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Layers size={48} className="mx-auto mb-3 opacity-50" />
          <p>No flashcards available.</p>
        </div>
      ) : (
        <>
          {/* Card */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-3 text-sm text-slate-500">
              Card {currentIndex + 1} of {filtered.length}
              {reviewer && (
                <span className="ml-2 text-indigo-600">· {reviewer.title}</span>
              )}
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative h-72 cursor-pointer perspective-1000"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-8 flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-xs text-slate-400 mb-3 uppercase tracking-wide">
                    Question
                  </div>
                  <p className="text-lg font-medium text-slate-800">{current.front}</p>
                  <div className="absolute bottom-4 text-xs text-slate-400 flex items-center gap-1">
                    <RotateCw size={12} /> Tap to flip
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-indigo-50 rounded-2xl border-2 border-indigo-200 shadow-lg p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-xs text-indigo-400 mb-3 uppercase tracking-wide">
                    Answer
                  </div>
                  <p className="text-base text-slate-800">{current.back}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={goPrev}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onUpdateStatus(current.id, "mastered");
                    goNext();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  <Check size={16} /> Mastered
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(current.id, "learning");
                    goNext();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  <RotateCw size={16} /> Still Learning
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(current.id, "unseen");
                    goNext();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
                >
                  <X size={16} /> Skip
                </button>
              </div>

              <button
                onClick={goNext}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
