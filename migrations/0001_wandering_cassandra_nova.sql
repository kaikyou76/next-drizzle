ALTER TABLE "users_table" ADD COLUMN "clerk_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_table" ADD CONSTRAINT "users_table_clerk_id_unique" UNIQUE("clerk_id");