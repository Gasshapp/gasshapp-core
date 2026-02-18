import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { coreUsers } from "./users.js";

export const coreContacts = pgTable(
  "core_contacts",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => coreUsers.id),
    contactUserId: uuid("contact_user_id")
      .notNull()
      .references(() => coreUsers.id),
    nickname: varchar({ length: 100 }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow(),
  },
  (t) => [
    uniqueIndex("core_contacts_user_contact_idx").on(
      t.userId,
      t.contactUserId,
    ),
  ],
);
