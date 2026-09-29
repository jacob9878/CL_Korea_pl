import type { Database } from "@/lib/supabase/database.types";

export type TaxonomyPickRow = { key: string; leaf: string; trail: string };

export type ExpertApplicationRow = Database["public"]["Tables"]["expert_applications"]["Row"] & {
  expert_application_taxonomy_picks: TaxonomyPickRow[];
  reviewer: { name: string } | null;
};

export type AuditLogRow = Database["public"]["Tables"]["audit_log"]["Row"] & {
  expert_applications: { org_name: string } | null;
  actor_profile: { name: string } | null;
};
