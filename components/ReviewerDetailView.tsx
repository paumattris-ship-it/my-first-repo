"use client";

import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Brain,
  Calendar,
  FileText,
} from "lucide-react";
import { Reviewer, Subject, Flashcard, Quiz, SourceDocument } from "@/lib/types";

interface ReviewerDetailViewProps {
  reviewer: Reviewer;
  subject: Subject | undefined;
  flashcards: Flashcard[];
  quizzes: Quiz[];
  documents: SourceDocument[];
  onBack: () => void;
  onStartFlashcards: () => void;
  onStartQuiz: (quizId: number) => void;
}

export function ReviewerDetailView({
  reviewer,
  subject,
  flashcards,
  quizzes,
  documents,
  onBack,
  onStartFlashcards,
  onStartQuiz,
}: ReviewerDetailViewProps) {
  const reviewerFlashcards = flashcards.filter((f) => f.reviewerId === reviewer.id);
  const reviewerQuizzes = quizzes.filter((q) => q.reviewerId === reviewer.id);
  const reviewerDocs = documents.filter((d) =>
    reviewer.sourceDocumentIds.includes(d.id)
  );

  const mastered = reviewerFlashcards.filter((f) => f.status === "mastered").length;
  const learning = reviewerFlashcards.filter((f) => f.status === "learning").length;
  const unseen = reviewerFlashcards.filter((f) => f.status === "unseen").length;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to All Reviewers
      </button>

      {/* Header */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${subject?.color || "#6366f1"}, ${
            subject?.color || "#6366f1"
          }dd)`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          {subject && (
            <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full font-medium">
              {subject.code}
            </span>
          )}
          <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full font-medium">
            {subject?.name}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-2">{reviewer.title}</h2>
        <p className="text-white/80">{reviewer.description}</p>

        <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            Created: {reviewer.createdAt}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            Updated: {reviewer.updatedAt}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Layers size={20} className="mx-auto text-indigo-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800">
            {reviewerFlashcards.length}
          </div>
          <div className="text-xs text-slate-500">Flashcards</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Brain size={20} className="mx-auto text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800">
            {reviewerQuizzes.length}
          </div>
          <div className="text-xs text-slate-500">Quizzes</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <FileText size={20} className="mx-auto text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-slate-800">{reviewerDocs.length}</div>
          <div className="text-xs text-slate-500">Documents</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Flashcards Section */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-indigo-600" />
              <h3 className="font-semibold text-slate-800">Flashcards</h3>
            </div>
            {reviewerFlashcards.length > 0 && (
              <button
                onClick={onStartFlashcards}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Study Now →
              </button>
            )}
          </div>

          <div className="p-5">
            {reviewerFlashcards.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                No flashcards yet.
              </p>
            ) : (
              <>
                {/* Mastery breakdown */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 text-center p-2 rounded-lg bg-emerald-50">
                    <div className="text-lg font-bold text-emerald-600">{mastered}</div>
                    <div className="text-xs text-emerald-600">Mastered</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-lg bg-amber-50">
                    <div className="text-lg font-bold text-amber-600">{learning}</div>
                    <div className="text-xs text-amber-600">Learning</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-lg bg-slate-50">
                    <div className="text-lg font-bold text-slate-500">{unseen}</div>
                    <div className="text-xs text-slate-500">Unseen</div>
                  </div>
                </div>

                {/* Sample cards */}
                <div className="space-y-2">
                  {reviewerFlashcards.slice(0, 3).map((card) => (
                    <div
                      key={card.id}
                      className="p-3 rounded-lg border border-slate-100 bg-slate-50"
                    >
                      <div className="text-sm font-medium text-slate-700 mb-1">
                        {card.front}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">
                        {card.back}
                      </div>
                    </div>
                  ))}
                  {reviewerFlashcards.length > 3 && (
                    <div className="text-xs text-slate-400 text-center">
                      +{reviewerFlashcards.length - 3} more cards
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quizzes Section */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-purple-600" />
              <h3 className="font-semibold text-slate-800">Quizzes</h3>
            </div>
          </div>

          <div className="p-5 space-y-3">
            {reviewerQuizzes.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                No quizzes yet.
              </p>
            ) : (
              reviewerQuizzes.map((quiz) => {
                const best = quiz.attempts.length
                  ? Math.max(
                      ...quiz.attempts.map((a) => Math.round((a.score / a.total) * 100))
                    )
                  : null;
                return (
                  <div
                    key={quiz.id}
                    className="p-4 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-slate-800 text-sm">
                          {quiz.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {quiz.questionCount} questions · {quiz.attempts.length} attempts
                        </div>
                      </div>
                      {best !== null && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            best >= 80
                              ? "bg-emerald-100 text-emerald-700"
                              : best >= 60
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          Best: {best}%
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onStartQuiz(quiz.id)}
                      className="w-full mt-2 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      {quiz.attempts.length > 0 ? "Retry" : "Start"} Quiz
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Source Documents */}
      {reviewerDocs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-amber-600" />
              <h3 className="font-semibold text-slate-800">Source Documents</h3>
            </div>
          </div>
          <div className="divide-y">
            {reviewerDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 px-5 py-3"
              >
                <FileText size={18} className="text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-700">{doc.title}</div>
                  <div className="text-xs text-slate-400">
                    {doc.type.toUpperCase()} · {doc.size}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
