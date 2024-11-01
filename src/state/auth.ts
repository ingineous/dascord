import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

export interface User {
  authID: string;
  name: string;
  avatar: string;
  bio: string;
  requestsSent: string[];
  requestsReceived: string[];
  friends: string[];
}

interface AuthProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: unknown | undefined;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: unknown | undefined) => void;
  setUser: (user: User | null) => void;
}

const useAuth = create<AuthProps>((set) => ({
  session: null,
  user: null,
  loading: true,
  error: undefined,
  setSession: (session) => set({ session }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: unknown) => set({ error }),
  setUser: (user: User | null) => set({ user }),
}));

export { useAuth };
