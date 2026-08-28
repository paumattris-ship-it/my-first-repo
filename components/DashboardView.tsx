"use client";

import React from "react";
import {
  BookOpen,
  FileText,
  Layers,
  Brain,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Reviewer, Subject, Flashcard, Quiz } from "@/lib/types";

interface DashboardViewProps {
  reviewers: Reviewer[];
  subjects: Subject[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
  documents: { id: number; title: string }[];
  onNavigate: (tab: "all-reviewers" | "flashcards" | "practice-quizzes" | "reviewer-generator", reviewerId?: number) => void;
}

export function DashboardView({
  reviewers,
  subjects,
  flashcards,
  quizzes,
  documents,
  onNavigate,
}: DashboardViewProps) {
  const mastered = flashcards.filter((f) => f.status === "mastered").length;
  const learning = flashcards.filter((f) => f.status === "learning").length;
  const unseen = flashcards.filter((f) => f.status === "unseen").length;
  const totalAttempts = quizzes.reduce((sum, q) => sum + q.attempts.length, 0);
  const allScores = quizzes.flatMap((q) =>
    q.attempts.map((a) => (a.score / a.total) * 100)
  );
  const avgScore =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;

  const recentReviewers = [...reviewers]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const stats = [
    {
      label: "Total Reviewers",
      value: reviewers.length,
      icon: BookOpen,
      color: "bg-indigo-100 text-indigo-600",
      tab: "all-reviewers" as const,
    },
    {
      label: "Source Documents",
      value: documents.length,
      icon: FileText,
      color: "bg-amber-100 text-amber-600",
      tab: "reviewer-generator" as const,
    },
    {
      label: "Flashcards",
      value: flashcards.length,
      icon: Layers,
      color: "bg-emerald-100 text-emerald-600",
      tab: "flashcards" as const,
    },
    {
      label: "Quiz Attempts",
      value: totalAttempts,
      icon: Brain,
      color: "bg-rose-100 text-rose-600",
      tab: "practice-quizzes" as const,
    },
  ];

  const masteryPct =
    flashcards.length > 0 ? Math.round((mastered / flashcards.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">Welcome back! 👋</h2>
        <p className="mt-1 text-indigo-100">
          Here&apos;s your study progress overview. Keep up the great work!
        </p>
        <button
          onClick={() => onNavigate("reviewer-generator")}
          className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Generate New Reviewer <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, tab }) => (
          <button
            key={label}
            onClick={() => onNavigate(tab)}
            className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow text-left"
          >
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
            <div className="text-sm text-slate-500">{label}</div>
          </button>
        ))}
      </div>

      {/* Progress & Flashcards breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-800">Flashcard Mastery</h3>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeDasharray={`${masteryPct} ${100 - masteryPct}`}
                  strokeDashoffset="25"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800">
                {masteryPct}%
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-slate-600">Mastered: {mastered}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-slate-600">Learning: {learning}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="text-slate-600">Unseen: {unseen}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-800">Quiz Performance</h3>
          </div>
          <div className="text-4xl font-bold text-slate-800 mb-1">
            {avgScore}<span className="text-lg text-slate-400">%</span>
          </div>
          <div className="text-sm text-slate-500 mb-4">
            Average score across {totalAttempts} attempt{totalAttempts !== 1 ? "s" : ""}
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${avgScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recent Reviewers */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-800">Recently Updated Reviewers</h3>
          </div>
          <button
            onClick={() => onNavigate("all-reviewers")}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="divide-y">
          {recentReviewers.map((r) => {
            const subject = subjects.find((s) => s.id === r.subjectId);
            return (
              <button
                key={r.id}
                onClick={() => onNavigate("all-reviewers", r.id)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: subject?.color || "#6366f1" }}
                  />
                  <div>
                    <div className="font-medium text-slate-800">{r.title}</div>
                    <div className="text-xs text-slate-500">
                      {subject?.name} · {r.flashcardCount} cards · {r.quizCount} quizzes
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{r.updatedAt}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
