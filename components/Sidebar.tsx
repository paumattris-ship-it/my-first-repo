"use client";

import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Layers,
  Brain,
  FileText,
  GraduationCap,
  X,
} from "lucide-react";
import { NavTab } from "@/lib/types";

export type { NavTab };

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "reviewer-generator", label: "Reviewer Generator", icon: Sparkles },
  { id: "all-reviewers", label: "All Reviewers", icon: BookOpen },
  { id: "flashcards", label: "Flashcards Hub", icon: Layers },
  { id: "practice-quizzes", label: "Practice Quizzes", icon: Brain },
  { id: "source-documents", label: "Source Documents", icon: FileText },
  { id: "subjects", label: "Subjects", icon: GraduationCap },
];

export function Sidebar({ currentTab, onTabChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              QC
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">QuizCraft</div>
              <div className="text-xs text-slate-400">Study smarter</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                onTabChange(id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentTab === id
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
