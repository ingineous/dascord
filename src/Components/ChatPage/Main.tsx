import { css } from "../../../styled-system/css";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { SlCompass } from "react-icons/sl";
import Search from "./Search.tsx";
import Editor from "./Editor.tsx";
import Message from "./Message.tsx";
import { Link } from "wouter";
import routes from "../../config/routes.ts";

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
    top: "-5px",
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
    fontSize: "24px",
  });

  const descriptionStyles = css({
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

  return (
    <div className={styles}>
      <div className={topbarStyles}>
        <div className={aboutStyles}>
          <p className={nameStyles}>momo</p>
          <p className={descriptionStyles}>
            The man who passes the sentence should swing the sowrd.
          </p>
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
        <div className={messagesContainer}>
          <Message message={"diddy"} />
          <Message message={"typhlosion"} />
          <Message message={"drake"} />
          <Message
            message={
              '<p><a target="_blank" rel="noopener noreferrer nofollow" href="http://google.com">google.com</a> </p><p></p>'
            }
          />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>

        <div className={editorContainer}>
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default Main;
