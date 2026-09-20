import React from "react";
import Link from "next/link";
import Image from "next/image";
import LeafIcon from "@/public/icon-leaf.png";
import { HomeIcon, PlusIcon } from "../components/Icons";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-[#E2E8F0] px-5 py-6 shadow-md lg:flex lg:flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 px-3 text-lg font-bold tracking-tight"
      >
        <Image src={LeafIcon} alt="LexiMind" className="h-8 w-8" /> LexiMind
      </Link>

      <nav className="mt-10 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl bg-[#EFF6FF] px-4 py-3 text-sm font-semibold text-[#2563EB]"
        >
          {/* <span>⌂</span> */}
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>

        <Link
          href="/study"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <span>◉</span>
          Learn
        </Link>

        <Link
          href="/add-word"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <PlusIcon className="h-4 w-4" />
          Add words
        </Link>

        <Link
          href="/progress"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <span>↗</span>
          Progress
        </Link>
      </nav>

      <div className="mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <span>⚙</span>
          Settings
        </Link>
      </div>
    </aside>
  );
}
