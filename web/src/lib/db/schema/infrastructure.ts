import { pgTable, serial, timestamp } from "drizzle-orm/pg-core";

// Technical table only; business and Better Auth schemas belong to later increments.
export const persistenceProbe = pgTable("persistence_probe", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
