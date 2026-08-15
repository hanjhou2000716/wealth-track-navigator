import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const id = (name = "id") => text(name).primaryKey();
const timestamp = () => text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`);

export const users = sqliteTable("users", { id: id(), emailHash: text("email_hash"), createdAt: timestamp() });
export const profiles = sqliteTable("profiles", { id: id(), userId: text("user_id").notNull(), name: text("name").notNull(), location: text("location"), summary: text("summary"), createdAt: timestamp() });
export const employment = sqliteTable("employment", { id: id(), profileId: text("profile_id").notNull(), company: text("company").notNull(), role: text("role").notNull(), startedAt: text("started_at"), endedAt: text("ended_at"), scope: text("scope"), impact: text("impact"), createdAt: timestamp() });
export const education = sqliteTable("education", { id: id(), profileId: text("profile_id").notNull(), institution: text("institution").notNull(), program: text("program"), createdAt: timestamp() });
export const projects = sqliteTable("projects", { id: id(), profileId: text("profile_id").notNull(), title: text("title").notNull(), description: text("description"), createdAt: timestamp() });
export const skills = sqliteTable("skills", { id: id(), profileId: text("profile_id").notNull(), name: text("name").notNull(), evidenceId: text("evidence_id"), createdAt: timestamp() });
export const analysisRuns = sqliteTable("analysis_runs", { id: id(), userId: text("user_id").notNull(), mode: text("mode").notNull(), status: text("status").notNull(), score: integer("score"), createdAt: timestamp() });
export const jobRecords = sqliteTable("job_records", { id: id(), providerId: text("provider_id").notNull(), companyId: text("company_id"), title: text("title").notNull(), region: text("region"), rawReference: text("raw_reference"), createdAt: timestamp() });
export const peopleRecords = sqliteTable("people_records", { id: id(), providerId: text("provider_id").notNull(), companyId: text("company_id"), role: text("role"), identityHash: text("identity_hash"), createdAt: timestamp() });
export const careerEdges = sqliteTable("career_edges", { id: id(), fromRole: text("from_role").notNull(), toRole: text("to_role").notNull(), sampleSize: integer("sample_size").notNull().default(0), evidenceId: text("evidence_id"), createdAt: timestamp() });
export const companies = sqliteTable("companies", { id: id(), name: text("name").notNull(), canonicalName: text("canonical_name").notNull(), createdAt: timestamp() });
export const universities = sqliteTable("universities", { id: id(), name: text("name").notNull(), canonicalName: text("canonical_name").notNull(), createdAt: timestamp() });
export const compensationRecords = sqliteTable("compensation_records", { id: id(), providerId: text("provider_id").notNull(), region: text("region").notNull(), role: text("role").notNull(), base: integer("base"), total: integer("total"), currency: text("currency"), evidenceId: text("evidence_id"), createdAt: timestamp() });
export const evidence = sqliteTable("evidence", { id: id(), providerId: text("provider_id"), sourceTier: text("source_tier").notNull(), sourceReference: text("source_reference"), observedAt: text("observed_at"), retrievedAt: text("retrieved_at").notNull(), freshness: text("freshness").notNull(), confidence: integer("confidence").notNull(), createdAt: timestamp() });
export const providerRegistry = sqliteTable("provider_registry", { id: id(), label: text("label").notNull(), enabled: integer("enabled", { mode: "boolean" }).notNull().default(false), contractVerified: integer("contract_verified", { mode: "boolean" }).notNull().default(false), piiPolicy: text("pii_policy").notNull(), retentionDays: integer("retention_days").notNull().default(0), createdAt: timestamp() });
export const strategyPlans = sqliteTable("strategy_plans", { id: id(), userId: text("user_id").notNull(), analysisRunId: text("analysis_run_id"), horizon: text("horizon").notNull(), actionsJson: text("actions_json").notNull(), status: text("status").notNull(), createdAt: timestamp() });
