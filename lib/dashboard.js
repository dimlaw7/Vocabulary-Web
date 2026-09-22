import { db } from "./db";

export async function getDashboardData() {
  const words = await db.words.toArray();
  const reviews = await db.reviews.toArray();

  const now = new Date();

  // Words currently due for review
  const dueWords = words.filter((word) => {
    if (!word.next_review_at) {
      return true;
    }

    return new Date(word.next_review_at) <= now;
  });

  // Words that have been successfully recalled at least once
  const learnedWords = words.filter((word) => word.repetitions > 0);

  // Review statistics
  const totalReviews = reviews.length;

  const successfulReviews = reviews.filter(
    (review) => review.result === "recalled" || review.result === "hint",
  ).length;

  const recallRate =
    totalReviews > 0 ? Math.round((successfulReviews / totalReviews) * 100) : 0;

  // Recent words
  const recentWords = [...words]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return {
    totalWords: words.length,
    learnedWords: learnedWords.length,
    dueWords: dueWords.length,
    recallRate,
    recentWords,
  };
}
