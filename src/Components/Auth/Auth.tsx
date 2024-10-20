import { css } from "../../../styled-system/css";
import { Typewriter } from "../Typewriter.tsx";

function Auth() {
  const styles = css({
    background: "eerieBlack",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "30px",
  });

  return (
    <div className={styles}>
      hi
      <p>
        <Typewriter string={"halo niece and nephew"} />
      </p>
    </div>
  );
}

export default Auth;
