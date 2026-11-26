import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const lumeCapability = pgEnum("lume_capability", ["client", "provider"]);

export const lumeProfile = pgTable("lume_profile", {
  userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  publicSlug: text("public_slug").notNull().unique(),
  displayName: text("display_name").notNull(),
  photoUrl: text("photo_url"),
  bio: text("bio"),
  city: text("city"),
  region: text("region"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const lumeProfileCapability = pgTable("lume_profile_capability", {
  userId: text("user_id").notNull().references(() => lumeProfile.userId, { onDelete: "cascade" }),
  capability: lumeCapability("capability").notNull(),
  activatedAt: timestamp("activated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [primaryKey({ columns: [table.userId, table.capability] })]);
