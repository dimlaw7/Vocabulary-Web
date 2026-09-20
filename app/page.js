"use client";

import Link from "next/link";
import LeafIcon from "../public/icon-leaf.png";
import Image from "next/image";
import Sidebar from "./components/Sidebar";

const stats = [
  {
    label: "Words learned",
    value: "24",
    detail: "+4 this week",
  },
  {
    label: "Due for review",
    value: "8",
    detail: "Ready to practice",
  },
  {
    label: "Recall rate",
    value: "82%",
    detail: "Last 30 days",
  },
  {
    label: "Current streak",
    value: "7",
    detail: "days",
  },
];

const recentWords = [
  {
    word: "Diligent",
    meaning: "Showing careful and persistent effort",
    status: "Learning",
  },
  {
    word: "Prudent",
    meaning: "Acting with careful judgment",
    status: "Learning",
  },
  {
    word: "Integrity",
    meaning: "Honesty and strong moral principles",
    status: "Mastered",
  },
  {
    word: "Minimalist",
    meaning: "Someone who prefers simplicity",
    status: "Learning",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#172554]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </main>
  );
}
