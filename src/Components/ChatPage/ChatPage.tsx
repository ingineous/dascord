import Protected from "../Protected/Protected.tsx";
import { css } from "../../../styled-system/css";
import Profile from "./Profile.tsx";
import Chat from "./Chat.tsx";
import Main from "./Main.tsx";

function ChatPage() {
  const mainStyles = css({
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100vw",
    backgroundColor: "eerieBlack",
  });

  const sidebarStyles = css({
    width: "18%",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
  });

  return (
    <Protected>
      <div className={mainStyles}>
        <div className={sidebarStyles}>
          <Profile
            avatar={"/ayase.webp"}
            username={"momo."}
            bio={"the dead dont need lovers."}
          />

          <Chat
            initial
            avatar={"/ayase.webp"}
            username={"momo"}
            text={
              "the ones who shoulda kill are the ones who are prepared to die."
            }
          />
        </div>

        <Main />
      </div>
    </Protected>
  );
}

export default ChatPage;
