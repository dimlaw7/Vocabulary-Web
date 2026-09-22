"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardData } from "../lib/dashboard";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RecentWords from "./components/RecentWords";
import StatCard from "./components/StatCard";

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-slate-500">Loading dashboard...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-red-500">Unable to load dashboard.</p>
      </main>
    );
  }

  const reviewProgress = data.dueWords > 0 ? 0 : 100;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#172554]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <section className="flex-1">
          {/* Header */}
          <Header />

          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            <Hero />

            {/* Stats */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Words saved"
                value={data.totalWords}
                detail="In your vocabulary"
              />

              <StatCard
                label="Words learned"
                value={data.learnedWords}
                detail="Reviewed at least once"
              />

              <StatCard
                label="Due for review"
                value={data.dueWords}
                detail="Ready to practice"
              />

              <StatCard
                label="Recall rate"
                value={`${data.recallRate}%`}
                detail="Across your reviews"
              />
            </section>

            {/* Main grid */}
            <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              {/* Continue learning */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2563EB]">
                      Continue learning
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">
                      Your words are waiting.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {data.dueWords === 0
                        ? "You are all caught up for now."
                        : `You have ${data.dueWords} ${
                            data.dueWords === 1 ? "word" : "words"
                          } ready for active recall.`}
                    </p>
                  </div>

                  <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-xl text-[#2563EB] sm:flex">
                    ◉
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Today&apos;s review
                    </span>

                    <span className="text-sm font-semibold text-[#2563EB]">
                      {data.dueWords} {data.dueWords === 1 ? "word" : "words"}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#2563EB]"
                      style={{
                        width: `${reviewProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    {reviewProgress}% of your daily review complete
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    {data.dueWords === 0
                      ? "All caught up"
                      : "Ready for your next review"}
                  </p>
                </div>

                <Link
                  href="/study"
                  className="mt-5 inline-flex rounded-xl bg-[#172554] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0F1C40]"
                >
                  {data.dueWords > 0 ? "Continue review" : "Practice words"}
                </Link>
              </div>

              {/* Quick actions */}
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                <h3 className="text-lg font-bold">Quick actions</h3>

                <div className="mt-5 space-y-3">
                  <Link
                    href="/add-word"
                    className="flex items-center justify-between rounded-xl border border-[#E2E8F0] p-4 transition hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-semibold">Add a new word</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Save something you want to remember
                      </p>
                    </div>

                    <span className="text-xl text-[#2563EB]">＋</span>
                  </Link>

                  <Link
                    href="/progress"
                    className="flex items-center justify-between rounded-xl border border-[#E2E8F0] p-4 transition hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-semibold">View progress</p>
                      <p className="mt-1 text-xs text-slate-500">
                        See how your recall is improving
                      </p>
                    </div>

                    <span className="text-xl text-[#10B981]">↗</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Recent words */}
            <RecentWords recentWords={recentWords} data={data} />
          </div>
        </section>
      </div>
    </main>
  );
}
