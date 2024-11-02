import { create } from "zustand";
import { User } from "./auth.ts";

export interface Message {
  dude: string;
  dudette: string;
  text: string;
  participants: string[];
  files: string[];
  time: Date;
}

export interface MessageAndUsers extends User {
  messages: Message[];
}

interface ChatProps {
  chats: MessageAndUsers[];
  setChats: (chats: MessageAndUsers[]) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentChat: number;
  setCurrentChat: (index: number) => void;
}

const useChat = create<ChatProps>((set) => ({
  chats: [],
  setChats: (chats: MessageAndUsers[]) => {
    console.log("setter chatterrrr", chats);
    set({ chats });
  },
  currentUser: null,
  setCurrentUser: (user: User | null) => set({ currentUser: user }),
  currentChat: 0,
  setCurrentChat: (index: number) => set({ currentChat: index }),
}));

export { useChat };
