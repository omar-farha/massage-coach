export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          duration: number;
          price: number;
          image_url: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          duration: number;
          price: number;
          image_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          name: string;
          phone: string;
          area: string;
          address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          area: string;
          address: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          customer_id: string;
          service_id: string;
          booking_date: string;
          start_time: string;
          end_time: string;
          status: BookingStatus;
          total_price: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          service_id: string;
          booking_date: string;
          start_time: string;
          end_time: string;
          status?: BookingStatus;
          total_price: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      availability: {
        Row: {
          id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["availability"]["Insert"]>;
        Relationships: [];
      };
      blocked_dates: {
        Row: {
          id: string;
          date: string;
          start_time: string | null;
          end_time: string | null;
          reason: string | null;
        };
        Insert: {
          id?: string;
          date: string;
          start_time?: string | null;
          end_time?: string | null;
          reason?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["blocked_dates"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {
      public_booking_slots: {
        Row: {
          booking_date: string;
          start_time: string;
          end_time: string;
        };
        Relationships: [];
      };
    };
    Functions: {
      create_booking: {
        Args: {
          p_service_id: string;
          p_booking_date: string;
          p_start_time: string;
          p_name: string;
          p_phone: string;
          p_area: string;
          p_address: string;
          p_notes: string | null;
        };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
