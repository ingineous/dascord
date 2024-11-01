import { css } from "../../styled-system/css";

function WhySoEmpty({ text = "why so empty?" }: { text?: string }) {
  const styles = css({
    fontSize: "100px",
    textAlign: "center",
    color: "onyx",
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  });

  return <p className={styles}>{text}</p>;
}

export default WhySoEmpty;
