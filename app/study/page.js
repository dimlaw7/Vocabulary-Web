export default function StudyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Review session</p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              Card 1 of 12
            </h1>
          </div>

          <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Exit
          </button>
        </header>

        {/* Vocabulary card */}
        <section className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
            Word
          </p>

          <h2 className="mt-6 text-5xl font-bold text-gray-900">Diligent</h2>

          <p className="mt-4 text-gray-500">What does this word mean?</p>

          {/* Hint */}
          <button className="mt-8 rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Need a hint
          </button>
        </section>
      </div>
    </main>
  );
}
