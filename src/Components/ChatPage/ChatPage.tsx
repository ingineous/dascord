import Protected from "../Protected/Protected.tsx";
import { css } from "../../../styled-system/css";
import Profile from "./Profile.tsx";
import Chat from "./Chat.tsx";
import Main from "./Main.tsx";
import { useAuth, User } from "../../state/auth.ts";
import truncate from "../../utils/truncate.ts";
import { useEffect, useState } from "react";
import api from "../../config/axios.ts";

function ChatPage() {
  const mainStyles = css({
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100vw",
    backgroundColor: "eerieBlack",
    overflowY: "auto",
  });

  const sidebarStyles = css({
    width: "18%",
    display: "flex",
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    height: "100vh",
    overflowY: "auto",
  });

  const chatContainerStyles = css({
    height: "93vh",
    overflowY: "auto",
  });

  const { session, user } = useAuth();

  const [friends, setFriends] = useState<Array<User>>([]);

  useEffect(() => {
    if (!user || !session) return;

    const getFriends = async () => {
      try {
        const { data } = await api.post("/friends", {
          accessToken: session?.access_token,
        });

        setFriends(data);
      } catch (error) {
        console.error(error);
      }
    };

    getFriends();
  }, [session, user]);

  return (
    <Protected>
      <div className={mainStyles}>
        <div className={sidebarStyles}>
          <Profile
            avatar={user?.avatar || ""}
            username={truncate(user?.name, 20)}
            bio={truncate(user?.bio, 20)}
          />

          <div className={chatContainerStyles}>
            {friends.map((friend, index) => {
              return (
                <Chat
                  key={friend.authID}
                  initial={index === 0}
                  avatar={friend.avatar}
                  name={friend.name}
                  authID={friend.authID}
                  friend={friend}
                />
              );
            })}
          </div>
        </div>

        <Main />
      </div>
    </Protected>
  );
}

export default ChatPage;
