import { css } from "../../../styled-system/css";
import { CiSettings } from "react-icons/ci";
import api from "../../config/axios.ts";
import { Message, useChat } from "../../state/chat.ts";
import { useAuth } from "../../state/auth.ts";
import { useEffect } from "react";

function Profile({
  avatar,
  username,
  bio,
}: {
  avatar: string;
  username: string;
  bio: string;
}) {
  const avatarStyles = css({
    width: "40px",
    height: "40px",
    borderRadius: "0px",
    marginRight: "20px",
  });

  const styles = css({
    display: "flex",
    padding: "7px",
    height: "7vh",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  });

  const descriptionStyles = css({
    fontSize: "14px",
    width: "100%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  });

  const containerStyles = css({
    cursor: "pointer",
    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const usernameStyles = css({
    marginBottom: "5px",
    color: "white",
    fontWeight: "bold",
  });

  const barStyles = css({
    border: "2px solid rgba(255, 255, 255, 0.15)",
    margin: "10px 0 0 0",
  });

  const cogwheelStyles = css({
    fontSize: "24px",
    position: "absolute",
    cursor: "pointer",
    top: "10px",
    right: "10px",
  });

  const { session, user } = useAuth();
  const { chats, setCurrentChat, setCurrentUser, setChats } = useChat();

  const getChat = async () => {
    const { data } = await api.post("/chat", {
      accessToken: session?.access_token,
      dudette: user?.authID,
    });

    return data;
  };

  const fetchSelf = async () => {
    const messages: Message[] = await getChat();

    let inChat = false;

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].authID === user?.authID) {
        inChat = true;
        setCurrentChat(i);
        break;
      }
    }

    const chat = { ...user, messages };

    const newChats = [...chats, chat];

    if (!inChat) {
      setCurrentChat(newChats.length - 1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setChats(newChats);
    }

    setCurrentUser(user);
  };

  useEffect(() => {
    fetchSelf();
  }, [user]);

  return (
    <div className={containerStyles} onClick={fetchSelf}>
      <div className={styles}>
        <img className={avatarStyles} src={avatar} alt={"Profile Picture"} />

        <div className={descriptionStyles}>
          <p className={usernameStyles}>{username}</p>
          <p>{bio}</p>
        </div>
        <CiSettings className={cogwheelStyles} />
      </div>

      <hr className={barStyles} />
    </div>
  );
}

export default Profile;
