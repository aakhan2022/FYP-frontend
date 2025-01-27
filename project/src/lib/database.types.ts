export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          role: 'candidate' | 'employer';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          role: 'candidate' | 'employer';
        };
        Update: {
          username?: string;
          avatar_url?: string | null;
          role?: 'candidate' | 'employer';
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          repo_name: string;
          repo_full_name: string;
          description: string | null;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          repo_name: string;
          repo_full_name: string;
          description?: string | null;
          skills?: string[];
        };
        Update: {
          repo_name?: string;
          repo_full_name?: string;
          description?: string | null;
          skills?: string[];
        };
      };
      feedback: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          status: 'pending' | 'resolved';
          created_at: string;
        };
        Insert: {
          user_id: string;
          content: string;
          status?: 'pending' | 'resolved';
        };
        Update: {
          content?: string;
          status?: 'pending' | 'resolved';
        };
      };
    };
  };
}