import React from "react";

export default function StatsCard({ label, value, detail }) {
  return (
    <div
      key={label}
      className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
    >
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  );
}
