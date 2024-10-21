import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface AuthProps {
  session: Session | null;
  loading: boolean;
  error: unknown | undefined;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: unknown | undefined) => void;
}

const useAuth = create<AuthProps>((set) => ({
  session: null,
  loading: true,
  error: undefined,
  setSession: (session) => set({ session }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: unknown) => set({ error }),
}));

export { useAuth };
