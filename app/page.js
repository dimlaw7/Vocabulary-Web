"use client";

import { useEffect, useRef, useState } from "react";
import { getDueWords, updateWordAfterReview } from "../lib/words";
import { addReview } from "../lib/reviews";
import { calculateNextReview } from "../lib/scheduling";

export default function Home() {
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
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!word) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">You&rsquo;re all caught up!</h1>

        <p className="mt-3 text-gray-600">
          There are no words due for review right now.
        </p>
      </main>
    );
  }

  if (result) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">
          {result === "recalled"
            ? "Correct!"
            : result === "hint"
              ? "Correct with a hint"
              : "Not quite"}
        </h1>

        <p className="mt-4 text-4xl font-bold">{word.word}</p>

        <p className="mt-4 text-gray-600">{word.definition}</p>

        {word.example && (
          <p className="mt-5 text-center italic text-gray-500">
            Example: &quot;{word.example}&quot;
          </p>
        )}

        {word.next_review_at && (
          <p className="mt-4 text-sm text-gray-500">
            Next review: {new Date(word.next_review_at).toLocaleDateString()}
          </p>
        )}

        <button
          onClick={loadWord}
          className="mt-8 rounded-lg bg-black px-6 py-3 text-white"
        >
          Continue
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-12">
      <p className="text-center text-sm text-gray-500">Practice</p>

      <h1 className="mt-12 text-center text-xl font-semibold">
        What word means:
      </h1>

      <p className="mt-5 text-center text-2xl leading-relaxed">
        &quot;{word.definition}&quot;
      </p>

      <input
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            checkAnswer();
          }
        }}
        placeholder="Type the word..."
        autoCapitalize="none"
        autoCorrect="off"
        className="mt-10 rounded-lg border px-4 py-4 text-lg outline-none focus:ring-2"
      />

      <button
        onClick={checkAnswer}
        className="mt-4 rounded-lg bg-black px-5 py-4 font-medium text-white"
      >
        Check
      </button>

      {hintLevel > 0 && (
        <div className="mt-5 rounded-lg bg-gray-100 p-4 text-center">
          <p className="text-sm font-semibold text-gray-500">Hint</p>

          <p className="mt-2 text-lg tracking-widest">{getHintText()}</p>
        </div>
      )}

      {hintLevel < 2 && (
        <button onClick={getHint} className="mt-3 p-3 text-sm font-semibold">
          {hintLevel === 0 ? "Give me a hint" : "Give me another hint"}
        </button>
      )}
    </main>
  );
}
