import { css } from "../../../styled-system/css";
import truncate from "../../utils/truncate.ts";

function Chat({
  initial = false,
  avatar,
  name,
  text,
}: {
  initial?: boolean;
  avatar: string;
  name: string;
  text: string;
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
    marginRight: "10px",
  });

  const nameStyles = css({
    fontWeight: "900",
    fontSize: "12px",
  });

  const textStyles = css({
    fontWeight: "300",
  });

  return (
    <div className={styles} style={{ paddingTop: initial ? 10 : 5 }}>
      <img className={picStyles} src={avatar} alt="user pic" />
      <div>
        <p className={nameStyles}>{truncate(name, 20)} </p>
        <p className={textStyles}>{truncate(text, 20)}</p>
      </div>
    </div>
  );
}

export default Chat;
