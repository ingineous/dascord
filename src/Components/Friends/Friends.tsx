import { css } from "../../../styled-system/css";
import routes from "../../config/routes.ts";
import { Link } from "wouter";
import Protected from "../Protected/Protected.tsx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

function Friends() {
  const containerStyles = css({
    display: "flex",
    background: "eerieBlack",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    padding: "10px 20px",
    alignItems: "center",
  });

  const returnStyles = css({
    alignSelf: "flex-start",

    _hover: {
      textDecoration: "underline",
    },
  });

  const titleStyles = css({
    fontSize: "54px",
    height: "15vh",
    marginTop: "30px",
    fontWeight: "900",
  });

  const profileStyles = css({
    height: "100px",
    width: "100px",
    marginRight: "20px",
  });

  const nameStyle = css({
    fontWeight: "900",
    fontSize: "20px",
    textDecoration: "underline",
    marginBottom: "20px",
  });

  const friendStyle = css({
    display: "flex",
    width: "100%",
    justifyContent: "center",
    height: "200px",
  });

  const friendsContainer = css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "100%",
    columnGap: "10px",
    rowGap: "10px",
    height: "75vh",
    overflowY: "auto",
    justifyContent: "space-around",
  });

  const buttonStyles = css({
    fontSize: "18px",
    borderRadius: "300px",
    padding: "5px",
    cursor: "pointer",
    background: "onyx",
    display: "flex",
    justifyContent: "center",
    width: "70px",
    marginRight: "10px",

    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(26,77,60,0.5)",
    },
  });

  const buttonContainer = css({
    display: "flex",
  });

  const closeButtonStyles = css({
    _hover: {
      background: "rgba(110,20,20,0.5) !important",
    },
  });

  return (
    <Protected>
      <div className={containerStyles}>
        <Link href={routes.chat} className={returnStyles}>
          return to chat.
        </Link>
        <h1 className={titleStyles}>niggas who want you.</h1>

        <div className={friendsContainer}>
          <div className={friendStyle}>
            <img className={profileStyles} src="/ayase.webp" alt="profile" />
            <div>
              <p className={nameStyle}>ayase momo.</p>

              <div className={buttonContainer}>
                <button className={buttonStyles}>
                  <IoCheckmarkSharp />
                </button>

                <button className={`${buttonStyles} ${closeButtonStyles}`}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>{" "}
          <div className={friendStyle}>
            <img className={profileStyles} src="/ayase.webp" alt="profile" />
            <div>
              <p className={nameStyle}>ayase momo.</p>

              <div className={buttonContainer}>
                <button className={buttonStyles}>
                  <IoCheckmarkSharp />
                </button>

                <button className={`${buttonStyles} ${closeButtonStyles}`}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>{" "}
          <div className={friendStyle}>
            <img className={profileStyles} src="/ayase.webp" alt="profile" />
            <div>
              <p className={nameStyle}>ayase momo.</p>

              <div className={buttonContainer}>
                <button className={buttonStyles}>
                  <IoCheckmarkSharp />
                </button>

                <button className={`${buttonStyles} ${closeButtonStyles}`}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>{" "}
          <div className={friendStyle}>
            <img className={profileStyles} src="/ayase.webp" alt="profile" />
            <div>
              <p className={nameStyle}>ayase momo.</p>

              <div className={buttonContainer}>
                <button className={buttonStyles}>
                  <IoCheckmarkSharp />
                </button>

                <button className={`${buttonStyles} ${closeButtonStyles}`}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}

export default Friends;
