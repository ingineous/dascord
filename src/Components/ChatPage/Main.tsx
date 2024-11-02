import { css } from "../../../styled-system/css";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { SlCompass } from "react-icons/sl";
import Search from "./Search.tsx";
import Editor from "./Editor.tsx";
import Message from "./Message.tsx";
import { Link } from "wouter";
import routes from "../../config/routes.ts";
import { useChat } from "../../state/chat.ts";
import { useEffect, useState } from "react";
import { useAuth } from "../../state/auth.ts";

function Main() {
  const styles = css({
    display: "flex",
    flexDirection: "column",
    width: "82%",
  });

  const topbarStyles = css({
    display: "flex",
    height: "7%",
    padding: "5px 40px",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const barStyles = css({
    border: "2px solid rgba(255, 255, 255, 0.15)",
    margin: "10px 0 0 0",
  });

  const mainStyles = css({
    display: "flex",
    flexDirection: "column",
    height: "90%",
    justifyContent: "space-between",
  });

  const nameStyles = css({
    fontSize: "18px",
  });

  const descriptionStyles = css({
    marginTop: "10px",
    fontSize: "14px",
  });

  const aboutStyles = css({
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
  });

  const iconStyles = css({
    fontSize: "32px",
    position: "relative",
    top: "-5px",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "5px",
    margin: "0 10px",

    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const iconContainerStyles = css({
    display: "flex",
  });

  const editorContainer = css({
    padding: "5px 10px",
    position: "relative",
    bottom: "-5px",
  });

  const messagesContainer = css({
    display: "flex",
    flexDirection: "column-reverse",
    overflowY: "auto",
  });

  const { currentUser, chats, currentChat } = useChat();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Element[]>([]);

  useEffect(() => {
    console.log(
      "chat changer cureneter",
      chats[currentChat],
      chats,
      currentUser,
    );
  }, [chats, currentChat, currentUser]);

  useEffect(() => {
    if (!chats[currentChat]) return;

    const newChat = chats[currentChat].messages.map((chat, index) => {
      return (
        <Message
          key={index}
          message={chat.text}
          name={
            chat.dude === currentUser?.authID
              ? currentUser.name
              : (user?.name as string)
          }
          avatar={
            chat.dude === currentUser?.authID
              ? currentUser.avatar
              : (user?.avatar as string)
          }
          files={chat.files}
          time={chat.time}
        />
      );
    });

    console.log("new chat", newChat);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setMessages([...newChat]);
  }, [chats, currentChat, currentUser, user]);

  return (
    <div className={styles}>
      <div className={topbarStyles}>
        <div className={aboutStyles}>
          <p className={nameStyles}>{currentUser?.name}</p>
          <p className={descriptionStyles}>{currentUser?.bio}</p>
        </div>

        <div className={iconContainerStyles}>
          <Link href={routes.explore}>
            <SlCompass className={iconStyles} />
          </Link>

          <Link href={routes.friends}>
            <LiaUserFriendsSolid className={iconStyles} />
          </Link>

          <Search />
        </div>
      </div>
      <hr className={barStyles} />

      <div className={mainStyles}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
        <div className={messagesContainer}>{messages}</div>

        <div className={editorContainer}>
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default Main;
