"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { User } from "@/lib/types";

interface UserSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  currentUser: User | null;
  onSwitch: (user: User) => void;
}

export function UserSwitchModal({
  isOpen,
  onClose,
  users,
  currentUser,
  onSwitch,
}: UserSwitchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">Switch User</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => {
                onSwitch(user);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                currentUser?.id === user.id
                  ? "bg-indigo-50 border-2 border-indigo-500"
                  : "border-2 border-transparent hover:bg-slate-50"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-slate-800">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : user.role === "teacher"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
                {currentUser?.id === user.id && (
                  <Check size={18} className="text-indigo-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
