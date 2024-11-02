import { css } from "../../../styled-system/css";
import truncate from "../../utils/truncate.ts";
import api from "../../config/axios.ts";
import { useAuth, User } from "../../state/auth.ts";
import { useChat, Message } from "../../state/chat.ts";
import { useEffect } from "react";

function Chat({
  initial = false,
  avatar,
  name,
  text,
  authID,
  friend,
}: {
  initial?: boolean;
  avatar: string;
  name: string;
  text: string;
  authID: string;
  friend: User;
}) {
  const styles = css({
    padding: "5px",
    display: "flex",
    cursor: "pointer",
    alignItems: "flex-start",

    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const picStyles = css({
    width: "40px",
    height: "40px",
    marginRight: "20px",
  });

  const nameStyles = css({
    fontWeight: "900",
    fontSize: "12px",
  });

  const textStyles = css({
    fontWeight: "300",
  });

  const { session } = useAuth();
  const { setCurrentUser, chats, setChats, setCurrentChat } = useChat();

  const getChat = async () => {
    const { data } = await api.post("/chat", {
      accessToken: session?.access_token,
      dudette: authID,
    });

    return data;
  };

  const onClick = async () => {
    const messages: Message[] = await getChat();

    let inChat = false;

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].authID === friend.authID) {
        inChat = true;
        console.log("setting chatter", i);
        setCurrentChat(i);
        break;
      }
    }

    const chat = { ...friend, messages };

    const newChats = [...chats, chat];

    if (!inChat) {
      setCurrentChat(newChats.length - 1);
      console.log("setting chatter from insider", newChats.length - 1);
      setChats(newChats);
    }

    setCurrentUser(friend);
  };

  useEffect(() => {
    console.log("chat changed", chats);
  }, [chats]);
  return (
    <div
      className={styles}
      style={{ paddingTop: initial ? 10 : 5 }}
      onClick={onClick}
    >
      <img className={picStyles} src={avatar} alt="user pic" />
      <div>
        <p className={nameStyles}>{truncate(name, 20)} </p>
        <p className={textStyles}>{truncate(text, 20)}</p>
      </div>
    </div>
  );
}

export default Chat;
