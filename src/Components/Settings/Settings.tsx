import Protected from "../Protected/Protected.tsx";
import { css } from "../../../styled-system/css";
import routes from "../../config/routes.ts";
import { Link } from "wouter";

function Settings() {
  const containerStyles = css({
    display: "flex",
    background: "eerieBlack",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 20px",
  });

  const returnStyles = css({
    alignSelf: "flex-start",

    _hover: {
      textDecoration: "underline",
    },
  });

  return (
    <Protected>
      <div className={containerStyles}>
        <Link href={routes.chat} className={returnStyles}>
          return to chat.
        </Link>
        settings
      </div>
    </Protected>
  );
}

export default Settings;
