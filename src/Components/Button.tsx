import { css } from "../../styled-system/css";

function Button({
  text = "get started.",
  onClick,
}: {
  text?: string | undefined;
  onClick?: () => void;
}) {
  const styles = css({
    backgroundColor: "roseTaupe",
    padding: "10px 30px",
    borderRadius: "200px",
    fontFamily: "IBM Plex Mono, monospace",
    cursor: "pointer",
    transition: "box-shadow 0.3s ease",
    _hover: {
      boxShadow: "0 5px 15px rgba(0,0,0,0.6)",
    },
    maxWidth: "180px",
  });
  return (
    <button className={styles} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
