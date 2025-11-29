import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resourceTypes = ["ebook", "lecture-notes", "research-paper", "multimedia"] as const;
export type ResourceType = typeof resourceTypes[number];

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  author: text("author").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  fileName: text("file_name"),
  fileSize: text("file_size"),
  fileUrl: text("file_url"),
  downloadCount: integer("download_count").default(0),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  downloadCount: true,
  createdAt: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const categoryDisplayNames: Record<ResourceType, string> = {
  "ebook": "E-books",
  "lecture-notes": "Lecture Notes",
  "research-paper": "Research Papers",
  "multimedia": "Multimedia"
};
