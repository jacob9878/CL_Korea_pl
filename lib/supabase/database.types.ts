export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          actor: string
          application_id: number
          created_at: string
          id: number
          note: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          actor: string
          application_id: number
          created_at?: string
          id?: never
          note?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          actor?: string
          application_id?: number
          created_at?: string
          id?: never
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "expert_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_application_taxonomy_picks: {
        Row: {
          application_id: number
          id: number
          key: string
          leaf: string
          trail: string
        }
        Insert: {
          application_id: number
          id?: never
          key: string
          leaf: string
          trail: string
        }
        Update: {
          application_id?: number
          id?: never
          key?: string
          leaf?: string
          trail?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_application_taxonomy_picks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "expert_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_applications: {
        Row: {
          address_addr1: string | null
          address_addr2: string | null
          address_zip: string | null
          birth: string | null
          consents: Json
          created_at: string
          credentials: string | null
          degree: string
          dept: string
          email: string
          granted_role: Database["public"]["Enums"]["app_role"] | null
          id: number
          major: string | null
          name: string
          org_name: string
          phone: string
          reject_reason: string | null
          requested_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string
          user_id: string
          years: number
        }
        Insert: {
          address_addr1?: string | null
          address_addr2?: string | null
          address_zip?: string | null
          birth?: string | null
          consents?: Json
          created_at?: string
          credentials?: string | null
          degree: string
          dept: string
          email: string
          granted_role?: Database["public"]["Enums"]["app_role"] | null
          id?: never
          major?: string | null
          name: string
          org_name: string
          phone: string
          reject_reason?: string | null
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
          user_id?: string
          years: number
        }
        Update: {
          address_addr1?: string | null
          address_addr2?: string | null
          address_zip?: string | null
          birth?: string | null
          consents?: Json
          created_at?: string
          credentials?: string | null
          degree?: string
          dept?: string
          email?: string
          granted_role?: Database["public"]["Enums"]["app_role"] | null
          id?: never
          major?: string | null
          name?: string
          org_name?: string
          phone?: string
          reject_reason?: string | null
          requested_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          updated_at?: string
          user_id?: string
          years?: number
        }
        Relationships: []
      }
      individual_signup_taxonomy_picks: {
        Row: {
          id: number
          key: string
          leaf: string
          signup_id: number
          trail: string
        }
        Insert: {
          id?: never
          key: string
          leaf: string
          signup_id: number
          trail: string
        }
        Update: {
          id?: never
          key?: string
          leaf?: string
          signup_id?: number
          trail?: string
        }
        Relationships: [
          {
            foreignKeyName: "individual_signup_taxonomy_picks_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "individual_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      individual_signups: {
        Row: {
          biz_num: string
          company_name: string
          consents: Json
          created_at: string
          email: string
          focus_field: string
          id: number
          intro_doc_path: string | null
          keywords: string | null
          manager_name: string
          manager_title: string | null
          org_type: string
          phone: string
          user_id: string
        }
        Insert: {
          biz_num: string
          company_name: string
          consents?: Json
          created_at?: string
          email: string
          focus_field: string
          id?: never
          intro_doc_path?: string | null
          keywords?: string | null
          manager_name: string
          manager_title?: string | null
          org_type: string
          phone: string
          user_id?: string
        }
        Update: {
          biz_num?: string
          company_name?: string
          consents?: Json
          created_at?: string
          email?: string
          focus_field?: string
          id?: never
          intro_doc_path?: string | null
          keywords?: string | null
          manager_name?: string
          manager_title?: string | null
          org_type?: string
          phone?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          member_type: string | null
          name: string
          org_name: string | null
          position: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          member_type?: string | null
          name: string
          org_name?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          member_type?: string | null
          name?: string
          org_name?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      resolve_expert_application: {
        Args: {
          p_application_id: number
          p_reason?: string
          p_status: Database["public"]["Enums"]["verification_status"]
        }
        Returns: {
          address_addr1: string | null
          address_addr2: string | null
          address_zip: string | null
          birth: string | null
          consents: Json
          created_at: string
          credentials: string | null
          degree: string
          dept: string
          email: string
          granted_role: Database["public"]["Enums"]["app_role"] | null
          id: number
          major: string | null
          name: string
          org_name: string
          phone: string
          reject_reason: string | null
          requested_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["verification_status"]
          updated_at: string
          user_id: string
          years: number
        }
        SetofOptions: {
          from: "*"
          to: "expert_applications"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      submit_individual_signup: {
        Args: {
          p_biz_num: string
          p_company_name: string
          p_consents?: Json
          p_email: string
          p_focus_field: string
          p_intro_doc_path?: string
          p_keywords?: string
          p_manager_name: string
          p_manager_title?: string
          p_org_type: string
          p_phone: string
          p_picks?: Json
        }
        Returns: {
          biz_num: string
          company_name: string
          consents: Json
          created_at: string
          email: string
          focus_field: string
          id: number
          intro_doc_path: string | null
          keywords: string | null
          manager_name: string
          manager_title: string | null
          org_type: string
          phone: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "individual_signups"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "VIEWER" | "GENERAL_MEMBER" | "MANAGER" | "ADMIN" | "EXPERT"
      audit_action: "APPROVE" | "REJECT"
      verification_kind: "company" | "university" | "research"
      verification_status: "PENDING" | "APPROVED" | "REJECTED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["VIEWER", "GENERAL_MEMBER", "MANAGER", "ADMIN", "EXPERT"],
      audit_action: ["APPROVE", "REJECT"],
      verification_kind: ["company", "university", "research"],
      verification_status: ["PENDING", "APPROVED", "REJECTED"],
    },
  },
} as const
