import React from "react";

export default function Stats({ stats }) {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
        >
          <p className="text-sm text-slate-500">{stat.label}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight">{stat.value}</p>

          <p className="mt-1 text-xs text-slate-400">{stat.detail}</p>
        </div>
      ))}
    </section>
  );
}
