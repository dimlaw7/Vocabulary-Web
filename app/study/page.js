"use client";

import { useEffect, useRef, useState } from "react";
import { getDueWords, updateWordAfterReview } from "../../lib/words";
import { addReview } from "../../lib/reviews";
import { calculateNextReview } from "../../lib/scheduling";
import Link from "next/link";

export default function StudyPage() {
  const [word, setWord] = useState(null);
  const [answer, setAnswer] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const startedAt = useRef(Date.now());

  useEffect(() => {
    loadWord();
  }, []);

  async function loadWord() {
    try {
      setLoading(true);
      //await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading delay
      //SetTimeout(() => {}, 500); // Simulate loading delay
      const words = await getDueWords();

      if (words.length === 0) {
        setWord(null);
        return;
      }

      setWord(words[0]);
      setAnswer("");
      setHintLevel(0);
      setResult(null);
      startedAt.current = Date.now();
    } catch (error) {
      console.error("Failed to load practice word:", error);
    } finally {
      setLoading(false);
    }
  }

  function getHint() {
    if (!word) return;

    setHintLevel((current) => Math.min(current + 1, 2));
  }

  function getHintText() {
    if (!word || hintLevel === 0) {
      return null;
    }

    if (hintLevel === 1) {
      return `Starts with "${word.word.charAt(0)}"`;
    }

    return word.word
      .split("")
      .map((character, index) => {
        if (index === 0 || index === word.word.length - 1) {
          return character;
        }

        return "_";
      })
      .join(" ");
  }

  async function checkAnswer() {
    if (!word || !answer.trim() || result) {
      return;
    }

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedWord = word.word.trim().toLowerCase();

    const correct = normalizedAnswer === normalizedWord;

    const reviewResult = correct
      ? hintLevel === 0
        ? "recalled"
        : "hint"
      : "forgot";

    const responseTimeMs = Date.now() - startedAt.current;

    try {
      await addReview({
        wordId: word.id,
        result: reviewResult,
        hintsUsed: hintLevel,
        responseTimeMs,
      });

      const nextLearningState = calculateNextReview({
        repetitions: word.repetitions,
        interval: word.interval,
        easeFactor: word.ease_factor,
        result: reviewResult,
      });

      await updateWordAfterReview(word.id, nextLearningState);

      setWord((current) => ({
        ...current,
        repetitions: nextLearningState.repetitions,
        interval: nextLearningState.interval,
        ease_factor: nextLearningState.easeFactor,
        next_review_at: nextLearningState.nextReviewAt,
        last_reviewed_at: new Date().toISOString(),
      }));

      setResult(reviewResult);
    } catch (error) {
      console.error("Failed to save review:", error);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#2563EB]" />
          <p className="mt-4 text-sm text-slate-500">
            Preparing your review...
          </p>
        </div>
      </main>
    );
  }

  if (!word) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-6">
        <header className="mx-auto flex h-20 max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-[#172554]"
          >
            Vocabulary
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-[#2563EB]"
          >
            Dashboard
          </Link>
        </header>

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-500">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#172554]">
              You&apos;re all caught up!
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
              There are no words due for review right now. Come back later and
              keep building your recall.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-[#2563EB] px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (result) {
    const wasCorrect = result === "recalled" || result === "hint";

    return (
      <main className="min-h-screen bg-[#F8FAFC] px-6">
        <header className="mx-auto flex h-20 max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-[#172554]"
          >
            Vocabulary
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-[#2563EB]"
          >
            Dashboard
          </Link>
        </header>

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center py-10">
          <div className="w-full rounded-3xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm md:p-12">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-2xl ${
                wasCorrect
                  ? "bg-emerald-50 text-emerald-500"
                  : "bg-amber-50 text-amber-500"
              }`}
            >
              {wasCorrect ? "✓" : "!"}
            </div>

            <p
              className={`mt-6 text-sm font-semibold ${
                wasCorrect ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {result === "recalled"
                ? "Perfect recall"
                : result === "hint"
                  ? "Correct with a hint"
                  : "Keep practicing"}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#172554]">
              {word.word}
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-slate-600">
              {word.definition}
            </p>

            {word.example && (
              <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left">
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Example
                </p>

                <p className="mt-2 leading-7 text-slate-600 italic">
                  &ldquo;{word.example}&rdquo;
                </p>
              </div>
            )}

            {word.next_review_at && (
              <p className="mt-6 text-sm text-slate-400">
                Next review{" "}
                <span className="font-medium text-slate-600">
                  {new Date(word.next_review_at).toLocaleDateString()}
                </span>
              </p>
            )}

            <button
              onClick={loadWord}
              className="mt-8 w-full rounded-xl bg-[#2563EB] px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    );
  }

  // return (
  //   <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-12">
  //     <p className="text-center text-sm text-gray-500">Practice</p>

  //     <h1 className="mt-12 text-center text-xl font-semibold">
  //       What word means:
  //     </h1>

  //     <p className="mt-5 text-center text-2xl leading-relaxed">
  //       &quot;{word.definition}&quot;
  //     </p>

  //     <input
  //       value={answer}
  //       onChange={(event) => setAnswer(event.target.value)}
  //       onKeyDown={(event) => {
  //         if (event.key === "Enter") {
  //           checkAnswer();
  //         }
  //       }}
  //       placeholder="Type the word..."
  //       autoCapitalize="none"
  //       autoCorrect="off"
  //       className="mt-10 rounded-lg border px-4 py-4 text-lg outline-none focus:ring-2"
  //     />

  //     <button
  //       onClick={checkAnswer}
  //       className="mt-4 rounded-lg bg-black px-5 py-4 font-medium text-white"
  //     >
  //       Check
  //     </button>

  //     {hintLevel > 0 && (
  //       <div className="mt-5 rounded-lg bg-gray-100 p-4 text-center">
  //         <p className="text-sm font-semibold text-gray-500">Hint</p>

  //         <p className="mt-2 text-lg tracking-widest">{getHintText()}</p>
  //       </div>
  //     )}

  //     {hintLevel < 2 && (
  //       <button onClick={getHint} className="mt-3 p-3 text-sm font-semibold">
  //         {hintLevel === 0 ? "Give me a hint" : "Give me another hint"}
  //       </button>
  //     )}
  //   </main>
  // );
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6">
      {/* Header */}
      <header className="mx-auto flex h-20 max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-[#172554]"
        >
          Vocabulary
        </Link>

        <div className="flex items-center gap-5">
          <span className="hidden text-sm text-slate-400 sm:block">
            Active recall
          </span>

          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-[#2563EB]"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* Practice area */}
      <div className="mx-auto max-w-2xl pt-8 pb-16">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span>Practice</span>
            <span>Recall the word</span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/3 rounded-full bg-[#2563EB]" />
          </div>
        </div>

        {/* Question card */}
        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-sm md:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF6FF] text-xl text-[#2563EB]">
              ?
            </div>

            <p className="mt-7 text-sm font-semibold tracking-wider text-slate-400 uppercase">
              What word means
            </p>

            <p className="mt-5 text-2xl leading-relaxed font-semibold tracking-tight text-[#172554] md:text-3xl">
              &ldquo;{word.definition}&rdquo;
            </p>
          </div>

          {/* Answer */}
          <div className="mt-10">
            <label
              htmlFor="answer"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              Your answer
            </label>

            <input
              id="answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  checkAnswer();
                }
              }}
              placeholder="Type the word you remember..."
              autoCapitalize="none"
              autoCorrect="off"
              autoFocus
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-4 text-lg text-[#172554] transition outline-none placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50"
            />

            <button
              onClick={checkAnswer}
              disabled={!answer.trim()}
              className="mt-3 w-full rounded-xl bg-[#2563EB] px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              Check answer
            </button>
          </div>

          {/* Hint */}
          <div className="mt-6 text-center">
            {hintLevel > 0 && (
              <div className="mb-4 rounded-2xl bg-amber-50 px-5 py-4">
                <p className="text-xs font-semibold tracking-wider text-amber-600 uppercase">
                  Hint
                </p>

                <p className="mt-2 text-lg font-medium tracking-widest text-amber-800">
                  {getHintText()}
                </p>
              </div>
            )}

            {hintLevel < 2 && (
              <button
                onClick={getHint}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-[#2563EB]"
              >
                {hintLevel === 0 ? "Give me a hint" : "Give me another hint"}
              </button>
            )}
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          Press Enter to check your answer
        </p>
      </div>
    </main>
  );
}
