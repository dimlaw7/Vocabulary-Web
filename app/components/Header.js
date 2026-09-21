import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-6 py-4 shadow lg:px-10">
      <div>
        <p className="text-sm text-slate-500">Sunday, September 20</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight">
          Good morning 👋
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Search"
          className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-slate-500 sm:flex"
        >
          ⌕
        </button>

        <button
          type="button"
          aria-label="Toggle theme"
          className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-slate-500 sm:flex"
        >
          ☼
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DBEAFE] text-sm font-bold text-[#2563EB]">
          V
        </div>
      </div>
    </header>
  );
}
