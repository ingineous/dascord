import { create } from "zustand";
import { User } from "./auth.ts";

interface Message {
  dude: string;
  dudette: string;
  text: string;
  participants: string[];
  files: string[];
  time: Date;
}

interface MessageAndUsers extends User {
  messages: Message[];
}

interface ChatProps {
  chats: MessageAndUsers[];
  setChats: (chats: MessageAndUsers[]) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const useChat = create<ChatProps>((set) => ({
  chats: [],
  setChats: (chats: MessageAndUsers[]) => set({ chats }),
  currentUser: null,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
}));

export { useChat };
