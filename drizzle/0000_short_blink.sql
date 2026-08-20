CREATE TABLE `analysis_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`mode` text NOT NULL,
	`status` text NOT NULL,
	`score` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `career_edges` (
	`id` text PRIMARY KEY NOT NULL,
	`from_role` text NOT NULL,
	`to_role` text NOT NULL,
	`sample_size` integer DEFAULT 0 NOT NULL,
	`evidence_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`canonical_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `compensation_records` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`region` text NOT NULL,
	`role` text NOT NULL,
	`base` integer,
	`total` integer,
	`currency` text,
	`evidence_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`institution` text NOT NULL,
	`program` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `employment` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`company` text NOT NULL,
	`role` text NOT NULL,
	`started_at` text,
	`ended_at` text,
	`scope` text,
	`impact` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text,
	`source_tier` text NOT NULL,
	`source_reference` text,
	`observed_at` text,
	`retrieved_at` text NOT NULL,
	`freshness` text NOT NULL,
	`confidence` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `job_records` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`company_id` text,
	`title` text NOT NULL,
	`region` text,
	`raw_reference` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `people_records` (
	`id` text PRIMARY KEY NOT NULL,
	`provider_id` text NOT NULL,
	`company_id` text,
	`role` text,
	`identity_hash` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`location` text,
	`summary` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_registry` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`enabled` integer DEFAULT false NOT NULL,
	`contract_verified` integer DEFAULT false NOT NULL,
	`pii_policy` text NOT NULL,
	`retention_days` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`name` text NOT NULL,
	`evidence_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `strategy_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`analysis_run_id` text,
	`horizon` text NOT NULL,
	`actions_json` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `universities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`canonical_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email_hash` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
