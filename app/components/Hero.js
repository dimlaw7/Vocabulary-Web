import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../public/hero.svg";

export default function Hero() {
  return (
    <section className="item flex flex-col rounded-3xl p-7 md:flex-row md:p-9">
      <div className="max-w-md">
        <p className="hidden text-sm font-medium text-blue-100">
          Keep building your vocabulary
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Build a stronger vocabulary, one word at a time.
        </h2>

        <p className="mt-4 max-w-xl leading-7 text-slate-500">
          Practice your saved words with spaced repitition and turn passive
          knowledge into active recall.
        </p>

        <Link
          href="/study"
          className="inlin-flex mt-7 hidden items-center rounded-xl bg-white px-5 py-3 font-semibold text-[#2563EB] transition hover:bg-blue-50"
        >
          Start practicing
          <span className="ml-2">→</span>
        </Link>
      </div>
      <div className="">
        <Image
          src={HeroImage}
          alt="Hero"
          className="max-w-2xs rounded-2xl lg:max-w-sm"
        />
      </div>
    </section>

    // <section className="rounded-3xl bg-[#2563EB] p-7 text-white shadow-sm md:p-9">
    //   <div className="max-w-2xl">
    //     <p className="text-sm font-medium text-blue-100">
    //       Keep building your vocabulary
    //     </p>

    //     <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
    //       Turn the words you know into words you can use.
    //     </h2>

    //     <p className="mt-4 max-w-xl leading-7 text-blue-100">
    //       Review your saved words through active recall and spaced
    //       repetition.
    //     </p>

    //     <Link
    //       href="/study"
    //       className="mt-7 inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-[#2563EB] transition hover:bg-blue-50"
    //     >
    //       Start practicing
    //       <span className="ml-2">→</span>
    //     </Link>
    //   </div>
    // </section>
  );
}
