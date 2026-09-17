import { db } from "./db";

export async function addReview({
  wordId,
  result,
  hintsUsed = 0,
  responseTimeMs = null,
}) {
  return db.reviews.add({
    word_id: wordId,
    result,
    hints_used: hintsUsed,
    response_time_ms: responseTimeMs,
    reviewed_at: new Date().toISOString(),
  });
}

export async function getReviewsForWord(wordId) {
  return db.reviews
    .where("word_id")
    .equals(wordId)
    .reverse()
    .sortBy("reviewed_at");
}
