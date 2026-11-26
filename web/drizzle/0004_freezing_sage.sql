CREATE TYPE "public"."lume_capability" AS ENUM('client', 'provider');--> statement-breakpoint
CREATE TABLE "lume_profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"photo_url" text,
	"bio" text,
	"city" text,
	"region" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lume_profile_capability" (
	"user_id" text NOT NULL,
	"capability" "lume_capability" NOT NULL,
	"activated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lume_profile_capability_user_id_capability_pk" PRIMARY KEY("user_id","capability")
);
--> statement-breakpoint
ALTER TABLE "lume_profile" ADD CONSTRAINT "lume_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action DEFERRABLE INITIALLY DEFERRED;--> statement-breakpoint
ALTER TABLE "lume_profile_capability" ADD CONSTRAINT "lume_profile_capability_user_id_lume_profile_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."lume_profile"("user_id") ON DELETE cascade ON UPDATE no action DEFERRABLE INITIALLY DEFERRED;
