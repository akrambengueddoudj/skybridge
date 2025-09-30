export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          student_id: string | null
          major: string | null
          academic_year: string | null
          career_interests: string | null
          member_type: 'active' | 'core'
          skills: string | null
          motivation: string | null
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          student_id?: string | null
          major?: string | null
          academic_year?: string | null
          career_interests?: string | null
          member_type: 'active' | 'core'
          skills?: string | null
          motivation?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          student_id?: string | null
          major?: string | null
          academic_year?: string | null
          career_interests?: string | null
          member_type?: 'active' | 'core'
          skills?: string | null
          motivation?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          event_time: string
          location: string
          event_type: 'workshop' | 'networking' | 'career' | 'panel' | 'competition'
          max_attendees: number | null
          current_attendees: number
          image_url: string | null
          is_featured: boolean
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          event_time: string
          location: string
          event_type: 'workshop' | 'networking' | 'career' | 'panel' | 'competition'
          max_attendees?: number | null
          current_attendees?: number
          image_url?: string | null
          is_featured?: boolean
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          event_time?: string
          location?: string
          event_type?: 'workshop' | 'networking' | 'career' | 'panel' | 'competition'
          max_attendees?: number | null
          current_attendees?: number
          image_url?: string | null
          is_featured?: boolean
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          status: 'unread' | 'read' | 'replied'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          status?: 'unread' | 'read' | 'replied'
          created_at?: string
        }
      }
    }
  }
}