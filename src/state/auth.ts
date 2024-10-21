import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface AuthProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const useAuth = create<AuthProps>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export { useAuth };
