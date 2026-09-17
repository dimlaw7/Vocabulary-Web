"use client";

import { useState } from "react";
import { addWord } from "../../lib/words";

export default function AddWordPage() {
  const [form, setForm] = useState({
    word: "",
    definition: "",
    example: "",
    pronunciation: "",
    language: "English",
  });

  const [message, setMessage] = useState("");

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
      setMessage("Word and definition are required.");
      return;
    }

    await addWord(form);

    setForm({
      word: "",
      definition: "",
      example: "",
      pronunciation: "",
      language: "English",
    });

    setMessage("Word added successfully.");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold">Add Word</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Word</label>
          <input
            name="word"
            value={form.word}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="e.g. diligent"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Definition</label>
          <textarea
            name="definition"
            value={form.definition}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
            rows={4}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Example</label>
          <textarea
            name="example"
            value={form.example}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
            rows={3}
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
            placeholder="e.g. DI-li-jent"
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
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Add Word
        </button>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </main>
  );
}
