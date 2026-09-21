"use client";

import Link from "next/link";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import HeroImage from "../public/hero.svg";
import Header from "./components/Header";
import Hero from "./components/Hero";

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

        {/* Main content */}
        <section className="flex-1">
          {/* Header */}
          <Header />

          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            <Hero />

            {/* Stats */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
                >
                  <p className="text-sm text-slate-500">{stat.label}</p>

                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">{stat.detail}</p>
                </div>
              ))}
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
                      You have 8 words ready for active recall.
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
                      8 words
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[35%] rounded-full bg-[#2563EB]" />
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    35% of your daily review complete
                  </p>
                </div>

                <Link
                  href="/study"
                  className="mt-5 inline-flex rounded-xl bg-[#172554] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0F1C40]"
                >
                  Continue review
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
            <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
                <div>
                  <h3 className="font-bold">Recent words</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Words you recently added
                  </p>
                </div>

                <Link
                  href="/words"
                  className="text-sm font-semibold text-[#2563EB]"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-[#E2E8F0]">
                {recentWords.map((item) => (
                  <div
                    key={item.word}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div>
                      <p className="font-semibold">{item.word}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.meaning}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Mastered"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
