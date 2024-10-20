import { css } from "../../../styled-system/css";
import { Typewriter } from "../Typewriter.tsx";

function Auth() {
  const styles = css({
    background: "eerieBlack",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "30px",
    justifyContent: "center",
    alignItems: "center",
  });

  const typewriterStyles = css({
    fontSize: "48px",
    fontWeight: 800,
    color: "cadetGray",
  });

  const buttonStyles = css({
    fontSize: "48px",
    color: "cadetGray",
    marginTop: "30px",
    cursor: "pointer",
    paddingBottom: "10px",
    transition: "all 0.01s linear",

    _hover: {
      color: "silver",

      _after: {
        borderBottom: "3px solid silver",
        height: "5px",
        width: "90%",
      },
    },

    _after: {
      content: "'' !important",
      borderBottom: "3px solid #989f9e",
      width: "90%",
      height: "5px",
      display: "block",
      margin: "0 auto",
    },
  });

  return (
    <div className={styles}>
      <Typewriter
        className={typewriterStyles}
        string={"sign in with google."}
        delay={250}
      />

      <span className={buttonStyles}>{"----->>>"}</span>
    </div>
  );
}

export default Auth;
