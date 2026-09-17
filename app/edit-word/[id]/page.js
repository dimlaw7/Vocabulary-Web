"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getWord, updateWord } from "../../../lib/words";

export default function EditWordPage() {
  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadWord() {
      const data = await getWord(Number(params.id));

      if (!data) {
        router.push("/words");
        return;
      }

      setForm({
        word: data.word,
        definition: data.definition,
        example: data.example || "",
        pronunciation: data.pronunciation || "",
        language: data.language || "English",
      });

      setLoading(false);
    }

    loadWord();
  }, [params.id, router]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.word.trim() || !form.definition.trim()) {
      return;
    }

    setSaving(true);

    await updateWord(Number(params.id), form);

    router.push("/words");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold">Edit Word</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Word</label>

          <input
            name="word"
            value={form.word}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Definition</label>

          <textarea
            name="definition"
            value={form.definition}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Example</label>

          <textarea
            name="example"
            value={form.example}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Pronunciation
          </label>

          <input
            name="pronunciation"
            value={form.pronunciation}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>

          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="English">English</option>
            <option value="Yoruba">Yoruba</option>
            <option value="Igbo">Igbo</option>
            <option value="Hausa">Hausa</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
