export type NavTab =
  | "dashboard"
  | "reviewer-generator"
  | "all-reviewers"
  | "flashcards"
  | "practice-quizzes"
  | "source-documents"
  | "subjects";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "teacher" | "admin";
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  color: string;
  reviewerCount: number;
}

export interface SourceDocument {
  id: number;
  title: string;
  type: "pdf" | "docx" | "txt" | "pptx";
  size: string;
  uploadedAt: string;
  subjectId: number;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  status: "unseen" | "learning" | "mastered";
  reviewerId: number;
}

export interface Quiz {
  id: number;
  title: string;
  reviewerId: number;
  questionCount: number;
  attempts: QuizAttempt[];
}

export interface QuizAttempt {
  id: number;
  score: number;
  total: number;
  date: string;
}

export interface Reviewer {
  id: number;
  title: string;
  description: string;
  subjectId: number;
  flashcardCount: number;
  quizCount: number;
  createdAt: string;
  updatedAt: string;
  sourceDocumentIds: number[];
}
