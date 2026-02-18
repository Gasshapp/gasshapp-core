import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { coreUsers } from "./users.js";

export const coreGroups = pgTable("core_groups", {
  id: uuid().primaryKey().defaultRandom(),
  creatorId: uuid("creator_id")
    .notNull()
    .references(() => coreUsers.id),
  parentGroupId: uuid("parent_group_id"),
  name: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow(),
});

// Self-reference must be added after table definition
// Drizzle handles self-refs via relations, not inline FK
