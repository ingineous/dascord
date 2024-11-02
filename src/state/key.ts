import { create } from "zustand";

export interface KeyProps {
  privateKey: string | null;
  setPrivateKey: (privateKey: string | null) => void;
}

const useKey = create<KeyProps>((set) => ({
  privateKey: null,
  setPrivateKey: (privateKey: string | null) => set({ privateKey }),
}));

export { useKey };
