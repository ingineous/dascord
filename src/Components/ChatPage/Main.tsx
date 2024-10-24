import { css } from "../../../styled-system/css";
import { IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import Search from "./Search.tsx";
import Tiptap from "../Tiptap.tsx";

function Main() {
  const styles = css({
    display: "flex",
    flexDirection: "column",
    width: "82%",
  });

  const topbarStyles = css({
    display: "flex",
    height: "65px",
    padding: "5px 20px",
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
    padding: "5px 20px",
    height: "100%",
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
    fontSize: "34px",
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
          <IoHomeOutline className={iconStyles} />
          <LiaUserFriendsSolid className={iconStyles} />

          <Search />
        </div>
      </div>
      <hr className={barStyles} />

      <div className={mainStyles}>
        hi
        <Tiptap />
      </div>
    </div>
  );
}

export default Main;
