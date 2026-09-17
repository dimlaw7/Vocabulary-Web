import Dexie from "dexie";

export const db = new Dexie("vocabulary");

db.version(1).stores({
  words: "++id, word, next_review_at, created_at",
  reviews: "++id, word_id, reviewed_at",
});
