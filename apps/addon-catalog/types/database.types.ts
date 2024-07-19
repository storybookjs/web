export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addon_author: {
        Row: {
          addon: number
          author: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          addon: number
          author: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          addon?: number
          author?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "addon_author_addon_fkey"
            columns: ["addon"]
            isOneToOne: false
            referencedRelation: "addons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addon_author_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      addon_tag: {
        Row: {
          addon: number | null
          created_at: string
          id: number
          tag: number | null
        }
        Insert: {
          addon?: number | null
          created_at?: string
          id?: number
          tag?: number | null
        }
        Update: {
          addon?: number | null
          created_at?: string
          id?: number
          tag?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "addon_tag_addon_fkey"
            columns: ["addon"]
            isOneToOne: false
            referencedRelation: "addons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addon_tag_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      addons: {
        Row: {
          created_at: string
          description: string | null
          display_name: string | null
          homepage_url: string | null
          icon: string | null
          id: number
          name: string
          npm_url: string | null
          readme: string | null
          renderers: string[] | null
          repository_url: string | null
          status: string | null
          verified: string | null
          weekly_downloads: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          homepage_url?: string | null
          icon?: string | null
          id?: number
          name: string
          npm_url?: string | null
          readme?: string | null
          renderers?: string[] | null
          repository_url?: string | null
          status?: string | null
          verified?: string | null
          weekly_downloads?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string | null
          homepage_url?: string | null
          icon?: string | null
          id?: number
          name?: string
          npm_url?: string | null
          readme?: string | null
          renderers?: string[] | null
          repository_url?: string | null
          status?: string | null
          verified?: string | null
          weekly_downloads?: number | null
        }
        Relationships: []
      }
      authors: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          aliases: string[] | null
          created_at: string
          description: string | null
          disabled: boolean
          display_name: string | null
          id: number
          is_category: boolean | null
          name: string
        }
        Insert: {
          aliases?: string[] | null
          created_at?: string
          description?: string | null
          disabled?: boolean
          display_name?: string | null
          id?: number
          is_category?: boolean | null
          name: string
        }
        Update: {
          aliases?: string[] | null
          created_at?: string
          description?: string | null
          disabled?: boolean
          display_name?: string | null
          id?: number
          is_category?: boolean | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
