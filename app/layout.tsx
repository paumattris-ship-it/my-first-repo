import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizCraft - Study Smarter",
  description: "Create comprehensive reviewers, flashcards, and quizzes from your study materials",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
