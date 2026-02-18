import {
  pgTable,
  uuid,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { groupRoleEnum } from "./enums.js";
import { coreGroups } from "./groups.js";
import { coreUsers } from "./users.js";

export const coreGroupMembers = pgTable(
  "core_group_members",
  {
    id: uuid().primaryKey().defaultRandom(),
    groupId: uuid("group_id")
      .notNull()
      .references(() => coreGroups.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => coreUsers.id),
    role: groupRoleEnum().notNull().default("member"),
    joinedAt: timestamp("joined_at", { withTimezone: true, mode: "string" }).defaultNow(),
  },
  (t) => [
    uniqueIndex("core_group_members_group_user_idx").on(t.groupId, t.userId),
  ],
);
