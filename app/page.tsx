"use client";

import React, { useState, useEffect, useCallback } from "react";

import { Sidebar, NavTab } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { UserSwitchModal } from "@/components/UserSwitchModal";
import { DashboardView } from "@/components/DashboardView";
import { ReviewerGeneratorView } from "@/components/ReviewerGeneratorView";
import { AllReviewersView } from "@/components/AllReviewersView";
import { FlashcardsHubView } from "@/components/FlashcardsHubView";
import { PracticeQuizzesView } from "@/components/PracticeQuizzesView";
import { SourceDocumentsView } from "@/components/SourceDocumentsView";
import { SubjectsView } from "@/components/SubjectsView";
import { ReviewerDetailView } from "@/components/ReviewerDetailView";
import { RefreshCw } from "lucide-react";

import {
  mockUsers,
  mockSubjects,
  mockDocuments,
  mockReviewers,
  mockFlashcards,
  mockQuizzes,
} from "@/lib/mockData";

import {
  User,
  Subject,
  SourceDocument,
  Flashcard,
  Quiz,
  Reviewer,
} from "@/lib/types";

const pageTitles: Record<NavTab, string> = {
  dashboard: "Dashboard",
  "reviewer-generator": "Reviewer Generator",
  "all-reviewers": "All Reviewers",
  flashcards: "Flashcards Hub",
  "practice-quizzes": "Practice Quizzes",
  "source-documents": "Source Documents",
  subjects: "Subjects",
};

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<NavTab>("dashboard");
  const [selectedReviewerId, setSelectedReviewerId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication & Users
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers] = useState<User[]>(mockUsers);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Core Data
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [documents, setDocuments] = useState<SourceDocument[]>(mockDocuments);
  const [reviewers, setReviewers] = useState<Reviewer[]>(mockReviewers);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [quizzes] = useState<Quiz[]>(mockQuizzes);

  // Initialize user
  useEffect(() => {
    setCurrentUser(mockUsers[0]);
  }, []);

  // Navigation helpers
  const handleNavigate = useCallback(
    (tab: NavTab, reviewerId?: number) => {
      setCurrentTab(tab);
      if (reviewerId) {
        setSelectedReviewerId(reviewerId);
      }
    },
    []
  );

  const handleSelectReviewer = useCallback((id: number) => {
    setSelectedReviewerId(id);
  }, []);

  const handleBackFromReviewer = useCallback(() => {
    setSelectedReviewerId(null);
  }, []);

  // Data mutations
  const handleUpdateFlashcardStatus = useCallback(
    (id: number, status: "unseen" | "learning" | "mastered") => {
      setFlashcards((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      );
    },
    []
  );

  const handleGenerateReviewer = useCallback(
    (data: {
      title: string;
      subjectId: number;
      documentIds: number[];
      flashcardCount: number;
      quizCount: number;
    }) => {
      const newReviewer: Reviewer = {
        id: Math.max(0, ...reviewers.map((r) => r.id)) + 1,
        title: data.title,
        description: `Generated reviewer with ${data.flashcardCount} flashcards and ${data.quizCount} quizzes.`,
        subjectId: data.subjectId,
        flashcardCount: data.flashcardCount,
        quizCount: data.quizCount,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        sourceDocumentIds: data.documentIds,
      };
      setReviewers((prev) => [newReviewer, ...prev]);

      // Update subject reviewer count
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === data.subjectId
            ? { ...s, reviewerCount: s.reviewerCount + 1 }
            : s
        )
      );
    },
    [reviewers]
  );

  const handleDeleteDocument = useCallback((id: number) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleAddSubject = useCallback(
    (subject: Omit<Subject, "id">) => {
      const newSubject: Subject = {
        ...subject,
        id: Math.max(0, ...subjects.map((s) => s.id)) + 1,
      };
      setSubjects((prev) => [...prev, newSubject]);
    },
    [subjects]
  );

  const handleDeleteSubject = useCallback((id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Determine what to render
  const selectedReviewer = selectedReviewerId
    ? reviewers.find((r) => r.id === selectedReviewerId)
    : null;

  const renderContent = () => {
    // If viewing a specific reviewer detail
    if (selectedReviewer && currentTab === "all-reviewers") {
      const subject = subjects.find((s) => s.id === selectedReviewer.subjectId);
      return (
        <ReviewerDetailView
          reviewer={selectedReviewer}
          subject={subject}
          flashcards={flashcards}
          quizzes={quizzes}
          documents={documents}
          onBack={handleBackFromReviewer}
          onStartFlashcards={() => handleNavigate("flashcards")}
          onStartQuiz={() => handleNavigate("practice-quizzes")}
        />
      );
    }

    switch (currentTab) {
      case "dashboard":
        return (
          <DashboardView
            reviewers={reviewers}
            subjects={subjects}
            flashcards={flashcards}
            quizzes={quizzes}
            documents={documents}
            onNavigate={handleNavigate}
          />
        );
      case "reviewer-generator":
        return (
          <ReviewerGeneratorView
            documents={documents}
            subjects={subjects}
            onGenerate={handleGenerateReviewer}
          />
        );
      case "all-reviewers":
        return (
          <AllReviewersView
            reviewers={reviewers}
            subjects={subjects}
            onSelectReviewer={handleSelectReviewer}
          />
        );
      case "flashcards":
        return (
          <FlashcardsHubView
            flashcards={flashcards}
            reviewers={reviewers}
            onUpdateStatus={handleUpdateFlashcardStatus}
          />
        );
      case "practice-quizzes":
        return (
          <PracticeQuizzesView
            quizzes={quizzes}
            reviewers={reviewers}
            onStartQuiz={() => {}}
          />
        );
      case "source-documents":
        return (
          <SourceDocumentsView
            documents={documents}
            subjects={subjects}
            onDelete={handleDeleteDocument}
            onUpload={() => {}}
          />
        );
      case "subjects":
        return (
          <SubjectsView
            subjects={subjects}
            onAdd={handleAddSubject}
            onDelete={handleDeleteSubject}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setSelectedReviewerId(null);
        }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:ml-64">
        <Header
          currentUser={currentUser}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onUserClick={() => setIsUserModalOpen(true)}
          pageTitle={
            selectedReviewer && currentTab === "all-reviewers"
              ? selectedReviewer.title
              : pageTitles[currentTab]
          }
        />

        <main className="p-4 lg:p-6">{renderContent()}</main>
      </div>

      <UserSwitchModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        users={allUsers}
        currentUser={currentUser}
        onSwitch={setCurrentUser}
      />
    </div>
  );
}
