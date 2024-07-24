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
      category: {
        Row: {
          avatar: string | null
          created_at: string
          id: number
          menu_id: number
          name: string
          order: number
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: number
          menu_id: number
          name: string
          order?: number
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: number
          menu_id?: number
          name?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "category_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menu"
            referencedColumns: ["id"]
          },
        ]
      }
      clipboard: {
        Row: {
          content: string
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      image: {
        Row: {
          created_at: string
          height: number | null
          id: number
          parent_id: number | null
          url: string | null
          width: number | null
        }
        Insert: {
          created_at?: string
          height?: number | null
          id?: number
          parent_id?: number | null
          url?: string | null
          width?: number | null
        }
        Update: {
          created_at?: string
          height?: number | null
          id?: number
          parent_id?: number | null
          url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "image_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
        ]
      }
      member: {
        Row: {
          avatar: string | null
          created_at: string
          first_name: string | null
          id: number
          last_name: string | null
          organization_id: number
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          organization_id: number
          user_id: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          organization_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      member_role: {
        Row: {
          created_at: string
          id: number
          member_id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          member_id: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          member_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_role_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "member"
            referencedColumns: ["id"]
          },
        ]
      }
      menu: {
        Row: {
          avatar: string | null
          created_at: string
          currency: string
          id: number
          name: string
          organization_id: number
          uuid: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          currency: string
          id?: number
          name: string
          organization_id: number
          uuid?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          currency?: string
          id?: number
          name?: string
          organization_id?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_item: {
        Row: {
          avatar: string | null
          category_id: number
          created_at: string
          id: number
          long_text: string | null
          name: string
          order: number
          price: string | null
          short_text: string | null
        }
        Insert: {
          avatar?: string | null
          category_id: number
          created_at?: string
          id?: number
          long_text?: string | null
          name: string
          order?: number
          price?: string | null
          short_text?: string | null
        }
        Update: {
          avatar?: string | null
          category_id?: number
          created_at?: string
          id?: number
          long_text?: string | null
          name?: string
          order?: number
          price?: string | null
          short_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      organization: {
        Row: {
          avatar: string | null
          created_at: string
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      social: {
        Row: {
          created_at: string
          id: number
          link: string | null
          order: number
          type: string
          value: string
          venue_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          link?: string | null
          order?: number
          type: string
          value: string
          venue_id: number
        }
        Update: {
          created_at?: string
          id?: number
          link?: string | null
          order?: number
          type?: string
          value?: string
          venue_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "social_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venue"
            referencedColumns: ["id"]
          },
        ]
      }
      theme: {
        Row: {
          created_at: string
          id: number
          name: string
          public: number
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          public: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          public?: number
        }
        Relationships: []
      }
      theme_param: {
        Row: {
          created_at: string
          id: number
          name: string
          stub: string
          theme_id: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          stub: string
          theme_id: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          stub?: string
          theme_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "theme_param_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "theme"
            referencedColumns: ["id"]
          },
        ]
      }
      venue: {
        Row: {
          avatar: string | null
          cover_image: string | null
          created_at: string
          id: number
          long_text: string | null
          menu_id: number | null
          menu_url: string | null
          name: string
          organization_id: number
          short_text: string | null
          slug: string | null
          theme_id: number | null
          venue_theme_id: number | null
        }
        Insert: {
          avatar?: string | null
          cover_image?: string | null
          created_at?: string
          id?: number
          long_text?: string | null
          menu_id?: number | null
          menu_url?: string | null
          name: string
          organization_id: number
          short_text?: string | null
          slug?: string | null
          theme_id?: number | null
          venue_theme_id?: number | null
        }
        Update: {
          avatar?: string | null
          cover_image?: string | null
          created_at?: string
          id?: number
          long_text?: string | null
          menu_id?: number | null
          menu_url?: string | null
          name?: string
          organization_id?: number
          short_text?: string | null
          slug?: string | null
          theme_id?: number | null
          venue_theme_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "theme"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_venue_theme_id_fkey"
            columns: ["venue_theme_id"]
            isOneToOne: false
            referencedRelation: "venue_theme"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_theme: {
        Row: {
          created_at: string
          id: number
          organization_id: number
          params: Json
          theme_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          organization_id: number
          params?: Json
          theme_id: number
        }
        Update: {
          created_at?: string
          id?: number
          organization_id?: number
          params?: Json
          theme_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "venue_theme_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_theme_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "theme"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_member_of: {
        Args: {
          _user_id: string
          _organization_id: number
        }
        Returns: boolean
      }
      is_member_of2: {
        Args: {
          _user_id: string
          _organization_id: number
        }
        Returns: boolean
      }
      is_super_admin: {
        Args: {
          _user_id: string
        }
        Returns: boolean
      }
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
