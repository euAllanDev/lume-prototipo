ALTER TABLE "lume_profile" ADD COLUMN "public_slug" text;--> statement-breakpoint
UPDATE "lume_profile" SET "public_slug" = 'perfil-' || substr(md5("user_id" || random()::text), 1, 16);--> statement-breakpoint
ALTER TABLE "lume_profile" ALTER COLUMN "public_slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lume_profile" ADD CONSTRAINT "lume_profile_public_slug_unique" UNIQUE("public_slug");
