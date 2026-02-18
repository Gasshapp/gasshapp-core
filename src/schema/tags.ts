import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const coreTags = pgTable("core_tags", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 50 }).unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow(),
});
