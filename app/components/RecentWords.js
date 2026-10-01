import React from "react";
import Link from "next/link";

export default function RecentWords({ data }) {
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

      {data.recentWords.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-slate-500">
            You haven&apos;t added any words yet.
          </p>

          <Link
            href="/add-word"
            className="mt-3 inline-block text-sm font-semibold text-[#2563EB]"
          >
            Add your first word →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[#E2E8F0]">
          {data.recentWords.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p className="font-semibold">{item.word}</p>

                <p className="mt-1 text-sm text-slate-500">{item.definition}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.repetitions > 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {item.repetitions > 0 ? "Learning" : "New"}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
