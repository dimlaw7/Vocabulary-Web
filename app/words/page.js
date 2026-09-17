"use client";

import { useEffect, useState } from "react";
import { deleteWord, getWords } from "../../lib/words";

function formatNextReview(date) {
  if (!date) {
    return "Not reviewed yet";
  }

  return new Date(date).toLocaleDateString();
}

export default function WordsPage() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWords() {
      try {
        const data = await getWords();
        setWords(data);
      } finally {
        setLoading(false);
      }
    }

    loadWords();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this word and its review history?",
    );

    if (!confirmed) {
      return;
    }

    await deleteWord(id);

    setWords((current) => current.filter((word) => word.id !== id));
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div>
        <h1 className="text-3xl font-bold">My Words</h1>

        <p className="mt-2 text-gray-600">
          {words.length} {words.length === 1 ? "word" : "words"} saved.
        </p>
      </div>

      {words.length === 0 ? (
        <div className="mt-10 rounded-xl border bg-white p-8 text-center">
          <p className="text-gray-600">You haven&apos;t added any words yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {words.map((word) => (
            <article key={word.id} className="rounded-xl border bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{word.word}</h2>

                  <p className="mt-1 text-sm text-gray-500">{word.language}</p>

                  <p className="mt-2 text-gray-700">{word.definition}</p>
                </div>

                <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs">
                  {word.repetitions} reviews
                </span>
              </div>

              {word.example && (
                <p className="mt-4 text-sm italic text-gray-500">
                  &quot;{word.example}&quot;
                </p>
              )}

              <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-gray-500">Interval</p>
                  <p className="mt-1 font-medium">
                    {word.interval} {word.interval === 1 ? "day" : "days"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Ease factor</p>
                  <p className="mt-1 font-medium">
                    {word.ease_factor.toFixed(1)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Next review</p>
                  <p className="mt-1 font-medium">
                    {formatNextReview(word.next_review_at)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-4">
                <a
                  href={`/edit-word/${word.id}`}
                  className="text-sm font-medium"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(word.id)}
                  className="text-sm font-medium text-red-600"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
