import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phone: varchar("phone"),
  location: varchar("location"),
  bio: varchar("bio"),
  preferences: jsonb("preferences").default({}),
  passwordHash: varchar("password_hash"),
  provider: varchar("provider").default("replit"),
  onboardingCompleted: varchar("onboarding_completed").default("false"),

  // Onboarding / application fields
  state: varchar("state"),
  householdSize: varchar("household_size"),
  onHousingAssistance: varchar("on_housing_assistance"),
  onGovernmentFunding: varchar("on_government_funding"),
  willingToRelocate: varchar("willing_to_relocate"),
  references: jsonb("references"),
  workHistory: jsonb("work_history"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
