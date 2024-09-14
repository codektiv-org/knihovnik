import {
  pgSchema,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

const createdAt = <const>{
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // modifiedAt: timestamp("modified_at"),
};

export const schema = pgSchema("knihovnik_schema");

export const userRoles = schema.enum("user_roles", [
  "ADMIN",
  "MODERATOR",
  "USER",
]);

export const transferTypes = schema.enum("transfer_types", [
  "BORROW",
  "GIVE",
  "TRANSITIVE",
]);

export const users = schema.table("users", {
  // Identity
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  userName: text("user_name").notNull().unique(),
  role: userRoles("role").default("USER").notNull(),

  // Login
  passwordHash: text("password_hash").notNull(),
  confirmHash: text("confirm_hash"),

  // Profile
  fullName: text("full_name").notNull(),
  pronouns: text("pronouns").notNull(),
  bio: text("bio"),

  ...createdAt,
});

export const items = schema.table("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageSrc: text("image_src"),
  ownerId: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  holderId: uuid("holder_id")
    .references(() => users.id)
    .notNull(),
  offered: boolean("offered").default(true).notNull(),
  iconName: text("icon_name"),
  transferType: transferTypes("transfer_type").default("BORROW").notNull(),

  ...createdAt,
});

export const borrowRequestStatuses = schema.enum("borrow_request_statuses", [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "CANCELLED",
]);

export const borrowRequests = schema.table("borrow_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  itemId: uuid("item_id")
    .references(() => items.id)
    .notNull(),
  lenderId: uuid("lender_id")
    .references(() => users.id)
    .notNull(),
  borrowerId: uuid("borrower_id")
    .references(() => users.id)
    .notNull(),
  status: borrowRequestStatuses("status").default("PENDING").notNull(),

  ...createdAt,
});

export const requestActions = schema.table("request_actions", {
  id: uuid("id").defaultRandom().primaryKey(),
  borrowRequestId: uuid("borrow_request_id")
    .references(() => borrowRequests.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  type: text("type").notNull(),
  message: text("message"),

  ...createdAt,
});

export const communityRoles = schema.enum("community_roles", [
  "ADMIN",
  "MODERATOR",
  "MEMBER",
  "INVITED",
  "REQUESTED",
]);

export const communities = schema.table("communities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  visibility: boolean("visibility").default(false).notNull(),
});

export const userCommunityRelations = schema.table("user_community_relations", {
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  communityId: uuid("community_id")
    .references(() => communities.id)
    .notNull(),
  role: communityRoles("role").default("MEMBER").notNull(),

  ...createdAt,
});

export const itemVisibility = schema.table("item_visibility", {
  itemId: uuid("item_id").references(() => items.id),
  communityId: uuid("community_id").references(() => communities.id),
});

export const notifications = schema.table("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  text: text("text"),
  url: text("url"),
  read: boolean("read").default(false).notNull(),

  ...createdAt,
});

export const communityMessages = schema.table("community_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  communityId: uuid("community_id")
    .references(() => communities.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  message: text("message"),

  ...createdAt,
});

export const resetTokens = schema.table("reset_tokens", {
  hash: text("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  type: text("type").notNull(),

  ...createdAt,
  expires: timestamp("expires"),
});
