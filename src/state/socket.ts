import { create } from "zustand";
import { Socket } from "socket.io-client";

interface AuthProps {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const useSocket = create<AuthProps>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));

export { useSocket };
