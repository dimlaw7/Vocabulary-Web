import React from "react";
import Link from "next/link";

export default function RecentWords({ recentWords }) {
  return (
    <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
        <div>
          <h3 className="font-bold">Recent words</h3>
          <p className="mt-1 text-sm text-slate-500">
            Words you recently added
          </p>
        </div>

        <Link href="/words" className="text-sm font-semibold text-[#2563EB]">
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
              <p className="mt-1 text-sm text-slate-500">{item.meaning}</p>
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
  );
}
