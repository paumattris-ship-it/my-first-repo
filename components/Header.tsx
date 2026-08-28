"use client";

import React from "react";
import { Menu, User as UserIcon, Bell } from "lucide-react";
import { User } from "@/lib/types";

interface HeaderProps {
  currentUser: User | null;
  onMenuToggle: () => void;
  onUserClick: () => void;
  pageTitle: string;
}

export function Header({ currentUser, onMenuToggle, onUserClick, pageTitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-slate-100 relative">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={onUserClick}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              {currentUser?.avatar || <UserIcon size={16} />}
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              {currentUser?.name || "Guest"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
