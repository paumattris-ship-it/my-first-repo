"use client";

import React, { useState } from "react";
import { Brain, Play, Trophy, Clock } from "lucide-react";
import { Quiz, Reviewer } from "@/lib/types";

interface PracticeQuizzesViewProps {
  quizzes: Quiz[];
  reviewers: Reviewer[];
  onStartQuiz: (quizId: number) => void;
}

export function PracticeQuizzesView({
  quizzes,
  reviewers,
  onStartQuiz,
}: PracticeQuizzesViewProps) {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    onStartQuiz(quiz.id);
  };

  const submitAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < (activeQuiz?.questionCount || 0)) {
      setCurrentQuestion((c) => c + 1);
    } else {
      setShowResults(true);
    }
  };

  if (activeQuiz && !showResults) {
    const reviewer = reviewers.find((r) => r.id === activeQuiz.reviewerId);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-800">{activeQuiz.title}</h3>
              <span className="text-sm text-slate-500">
                Question {currentQuestion + 1} of {activeQuiz.questionCount}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all"
                style={{
                  width: `${((currentQuestion + 1) / activeQuiz.questionCount) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-500 mb-1">{reviewer?.title}</p>
            <p className="text-lg font-medium text-slate-800 mb-6">
              Sample Question {currentQuestion + 1}: This is a placeholder question for{" "}
              {activeQuiz.title}. In a real implementation, this would pull from your
              generated quiz content.
            </p>

            <div className="space-y-3">
              {["Option A", "Option B", "Option C", "Option D"].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => submitAnswer(i)}
                  className="w-full p-4 text-left border-2 border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeQuiz && showResults) {
    const score = Math.floor(Math.random() * 3) + activeQuiz.questionCount - 2;
    const pct = Math.round((score / activeQuiz.questionCount) * 100);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <Trophy
            size={64}
            className={`mx-auto mb-4 ${
              pct >= 80
                ? "text-amber-500"
                : pct >= 60
                ? "text-indigo-500"
                : "text-slate-400"
            }`}
          />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
          <p className="text-slate-600 mb-6">
            You scored {score} out of {activeQuiz.questionCount} ({pct}%)
          </p>

          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div
              className={`h-full rounded-full ${
                pct >= 80
                  ? "bg-emerald-500"
                  : pct >= 60
                  ? "bg-indigo-500"
                  : "bg-amber-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startQuiz(activeQuiz)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Retry Quiz
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => {
          const reviewer = reviewers.find((r) => r.id === quiz.reviewerId);
          const lastAttempt = quiz.attempts[quiz.attempts.length - 1];
          const bestScore = quiz.attempts.length
            ? Math.max(...quiz.attempts.map((a) => Math.round((a.score / a.total) * 100)))
            : null;

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Brain size={20} className="text-purple-600" />
                </div>
                {bestScore !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      bestScore >= 80
                        ? "bg-emerald-100 text-emerald-700"
                        : bestScore >= 60
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Best: {bestScore}%
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-slate-800 mb-1">{quiz.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{reviewer?.title}</p>

              <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                <span>{quiz.questionCount} questions</span>
                <span>{quiz.attempts.length} attempts</span>
              </div>

              {lastAttempt && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <Clock size={12} />
                  Last: {lastAttempt.score}/{lastAttempt.total} on {lastAttempt.date}
                </div>
              )}

              <button
                onClick={() => startQuiz(quiz)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <Play size={16} />
                {quiz.attempts.length > 0 ? "Retry" : "Start"} Quiz
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
