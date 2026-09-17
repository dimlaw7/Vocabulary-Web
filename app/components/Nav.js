import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
        <Link href="/" className="font-semibold">
          Practice
        </Link>

        <Link href="/words" className="text-gray-600">
          My Words
        </Link>

        <Link href="/add-word" className="text-gray-600">
          Add Word
        </Link>
      </div>
    </nav>
  );
}
