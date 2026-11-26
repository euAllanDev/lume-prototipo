DROP INDEX "rate_limit_key_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "account_provider_account_unique" ON "account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "rate_limit_key_unique" ON "rate_limit" USING btree ("key");--> statement-breakpoint
CREATE INDEX "rate_limit_last_request_idx" ON "rate_limit" USING btree ("last_request");