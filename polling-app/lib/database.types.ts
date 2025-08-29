export interface Database {
  public: {
    Tables: {
      polls: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          created_by: string
          is_active: boolean
          ends_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          created_by: string
          is_active?: boolean
          ends_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          created_by?: string
          is_active?: boolean
          ends_at?: string | null
        }
      }
      poll_options: {
        Row: {
          id: string
          poll_id: string
          option_text: string
          created_at: string
        }
        Insert: {
          id?: string
          poll_id: string
          option_text: string
          created_at?: string
        }
        Update: {
          id?: string
          poll_id?: string
          option_text?: string
          created_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          poll_id: string
          option_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          poll_id: string
          option_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          poll_id?: string
          option_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}

export type Poll = Database['public']['Tables']['polls']['Row']
export type PollInsert = Database['public']['Tables']['polls']['Insert']
export type PollOption = Database['public']['Tables']['poll_options']['Row']
export type PollOptionInsert = Database['public']['Tables']['poll_options']['Insert']
export type Vote = Database['public']['Tables']['votes']['Row']
export type VoteInsert = Database['public']['Tables']['votes']['Insert']
