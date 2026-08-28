import {
  User,
  Subject,
  SourceDocument,
  Flashcard,
  Quiz,
  Reviewer,
} from "./types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@university.edu.ph",
    avatar: "MS",
    role: "student",
  },
  {
    id: 2,
    name: "Juan dela Cruz",
    email: "juan.delacruz@university.edu.ph",
    avatar: "JC",
    role: "student",
  },
  {
    id: 3,
    name: "Dr. Reyes",
    email: "reyes@university.edu.ph",
    avatar: "DR",
    role: "teacher",
  },
];

export const mockSubjects: Subject[] = [
  { id: 1, name: "Calculus", code: "MATH101", color: "#3b82f6", reviewerCount: 4 },
  { id: 2, name: "Physics", code: "PHYS201", color: "#ef4444", reviewerCount: 3 },
  { id: 3, name: "Biology", code: "BIO150", color: "#22c55e", reviewerCount: 2 },
  { id: 4, name: "Philippine History", code: "HIST100", color: "#f59e0b", reviewerCount: 5 },
  { id: 5, name: "Computer Science", code: "CS110", color: "#8b5cf6", reviewerCount: 3 },
];

export const mockDocuments: SourceDocument[] = [
  { id: 1, title: "Calculus Chapter 1 - Limits", type: "pdf", size: "2.4 MB", uploadedAt: "2026-08-10", subjectId: 1 },
  { id: 2, title: "Physics - Newton's Laws Notes", type: "pdf", size: "1.8 MB", uploadedAt: "2026-08-12", subjectId: 2 },
  { id: 3, title: "Cell Biology Lecture Slides", type: "pptx", size: "5.1 MB", uploadedAt: "2026-08-14", subjectId: 3 },
  { id: 4, title: "Katipunan and the Revolution", type: "pdf", size: "3.2 MB", uploadedAt: "2026-08-15", subjectId: 4 },
  { id: 5, title: "Data Structures Overview", type: "docx", size: "900 KB", uploadedAt: "2026-08-18", subjectId: 5 },
  { id: 6, title: "Integral Calculus Notes", type: "pdf", size: "2.9 MB", uploadedAt: "2026-08-20", subjectId: 1 },
  { id: 7, title: "Thermodynamics Summary", type: "txt", size: "120 KB", uploadedAt: "2026-08-22", subjectId: 2 },
];

export const mockReviewers: Reviewer[] = [
  {
    id: 1,
    title: "Limits & Continuity Reviewer",
    description: "Comprehensive reviewer covering limits, continuity, and the intermediate value theorem.",
    subjectId: 1,
    flashcardCount: 32,
    quizCount: 3,
    createdAt: "2026-08-12",
    updatedAt: "2026-08-25",
    sourceDocumentIds: [1, 6],
  },
  {
    id: 2,
    title: "Newton's Laws Mastery",
    description: "Deep dive into the three laws of motion with real-world examples.",
    subjectId: 2,
    flashcardCount: 24,
    quizCount: 2,
    createdAt: "2026-08-14",
    updatedAt: "2026-08-24",
    sourceDocumentIds: [2],
  },
  {
    id: 3,
    title: "Cell Structure & Function",
    description: "Flashcards and quizzes on cell organelles and their functions.",
    subjectId: 3,
    flashcardCount: 40,
    quizCount: 4,
    createdAt: "2026-08-16",
    updatedAt: "2026-08-26",
    sourceDocumentIds: [3],
  },
  {
    id: 4,
    title: "The Philippine Revolution",
    description: "Reviewer covering the Katipunan, key figures, and major events of 1896.",
    subjectId: 4,
    flashcardCount: 55,
    quizCount: 5,
    createdAt: "2026-08-18",
    updatedAt: "2026-08-27",
    sourceDocumentIds: [4],
  },
  {
    id: 5,
    title: "Data Structures Basics",
    description: "Introduction to arrays, linked lists, stacks, and queues.",
    subjectId: 5,
    flashcardCount: 28,
    quizCount: 2,
    createdAt: "2026-08-20",
    updatedAt: "2026-08-26",
    sourceDocumentIds: [5],
  },
  {
    id: 6,
    title: "Derivatives Quick Guide",
    description: "Quick reviewer on differentiation rules and applications.",
    subjectId: 1,
    flashcardCount: 20,
    quizCount: 2,
    createdAt: "2026-08-22",
    updatedAt: "2026-08-27",
    sourceDocumentIds: [1],
  },
];

export const mockFlashcards: Flashcard[] = [
  { id: 1, front: "What is the limit of sin(x)/x as x approaches 0?", back: "1", status: "mastered", reviewerId: 1 },
  { id: 2, front: "Define continuity at a point x = a.", back: "A function f is continuous at x = a if: (1) f(a) is defined, (2) lim x→a f(x) exists, (3) lim x→a f(x) = f(a).", status: "learning", reviewerId: 1 },
  { id: 3, front: "State Newton's First Law of Motion.", back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.", status: "mastered", reviewerId: 2 },
  { id: 4, front: "What is F = ma?", back: "Newton's Second Law: Force equals mass times acceleration.", status: "learning", reviewerId: 2 },
  { id: 5, front: "What is the powerhouse of the cell?", back: "The mitochondrion — it produces ATP through cellular respiration.", status: "mastered", reviewerId: 3 },
  { id: 6, front: "What is the function of the ribosome?", back: "Ribosomes synthesize proteins by translating messenger RNA (mRNA).", status: "unseen", reviewerId: 3 },
  { id: 7, front: "Who founded the Katipunan?", back: "Andres Bonifacio, along with Teodoro Plata, Ladislao Diwa, and others, on July 7, 1892.", status: "learning", reviewerId: 4 },
  { id: 8, front: "What is a linked list?", back: "A linear data structure where elements are connected via pointers, each node containing data and a reference to the next node.", status: "unseen", reviewerId: 5 },
  { id: 9, front: "What is the derivative of x²?", back: "2x (using the power rule)", status: "mastered", reviewerId: 6 },
  { id: 10, front: "State the Intermediate Value Theorem.", back: "If f is continuous on [a, b] and N is any number between f(a) and f(b), then there exists c in (a, b) such that f(c) = N.", status: "unseen", reviewerId: 1 },
];

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    title: "Limits Practice Quiz",
    reviewerId: 1,
    questionCount: 10,
    attempts: [
      { id: 1, score: 7, total: 10, date: "2026-08-20" },
      { id: 2, score: 9, total: 10, date: "2026-08-25" },
    ],
  },
  {
    id: 2,
    title: "Newton's Laws Quiz",
    reviewerId: 2,
    questionCount: 8,
    attempts: [
      { id: 3, score: 6, total: 8, date: "2026-08-22" },
    ],
  },
  {
    id: 3,
    title: "Cell Organelles Quiz",
    reviewerId: 3,
    questionCount: 15,
    attempts: [
      { id: 4, score: 12, total: 15, date: "2026-08-24" },
      { id: 5, score: 14, total: 15, date: "2026-08-27" },
    ],
  },
  {
    id: 4,
    title: "Philippine Revolution Key Events",
    reviewerId: 4,
    questionCount: 12,
    attempts: [],
  },
  {
    id: 5,
    title: "Derivatives Challenge",
    reviewerId: 6,
    questionCount: 10,
    attempts: [
      { id: 6, score: 8, total: 10, date: "2026-08-27" },
    ],
  },
];
