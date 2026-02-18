import { pgEnum } from "drizzle-orm/pg-core";

export const groupRoleEnum = pgEnum("group_role", ["admin", "member"]);
