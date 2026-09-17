import { db } from "./db";

export async function addWord({
  word,
  definition,
  example = "",
  pronunciation = "",
  language = "English",
}) {
  const now = new Date().toISOString();

  return db.words.add({
    word,
    definition,
    example,
    pronunciation,
    language,

    repetitions: 0,
    interval: 0,
    ease_factor: 2.5,

    next_review_at: null,
    last_reviewed_at: null,

    created_at: now,
    updated_at: now,
  });
}

export async function getWords() {
  return db.words.orderBy("created_at").reverse().toArray();
}

export async function getWord(id) {
  return db.words.get(id);
}

export async function updateWord(id, changes) {
  return db.words.update(id, {
    ...changes,
    updated_at: new Date().toISOString(),
  });
}

export async function deleteWord(id) {
  await db.transaction("rw", db.words, db.reviews, async () => {
    await db.reviews.where("word_id").equals(id).delete();
    await db.words.delete(id);
  });
}

export async function updateWordAfterReview(id, scheduling) {
  return db.words.update(id, {
    repetitions: scheduling.repetitions,
    interval: scheduling.interval,
    ease_factor: scheduling.easeFactor,
    next_review_at: scheduling.nextReviewAt,
    last_reviewed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export async function getDueWords() {
  const words = await db.words.toArray();
  const now = new Date();

  return words.filter((word) => {
    if (!word.next_review_at) {
      return true;
    }

    return new Date(word.next_review_at) <= now;
  });
}
