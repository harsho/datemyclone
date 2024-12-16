CREATE TABLE IF NOT EXISTS "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"gender" text NOT NULL,
	"age" integer NOT NULL,
	"relationship_goals" text NOT NULL,
	"gender_preference" text NOT NULL,
	"career" text NOT NULL,
	"height_weight" text NOT NULL,
	"interests" text NOT NULL,
	"education" text NOT NULL,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"persona" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profile_user_id_unique" UNIQUE("user_id")
);
