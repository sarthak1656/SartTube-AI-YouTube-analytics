import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const AiThumbnailTable = pgTable("ai_thumbnails", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userInput: varchar(),
  thumbnailUrl: varchar(),
  refImageUrl: varchar(),
  faceImageUrl: varchar(),
  userEmail: varchar().references(() => usersTable.email),
  createdAt: timestamp().notNull().defaultNow(),
});
