import { css } from "../../../styled-system/css";
import { Typewriter } from "../Typewriter.tsx";
import supabase from "../../supabase.ts";
import { useAuth } from "../../state/auth.ts";
import { useEffect } from "react";
import { useLocation } from "wouter";
import routes from "../../config/routes.ts";

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

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const { session, loading } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && session) setLocation(routes.home);
  }, [session, loading]);

  return !session ? (
    <div className={styles}>
      <Typewriter
        className={typewriterStyles}
        string={"sign in with google."}
        delay={300}
      />

      <button className={buttonStyles} onClick={signIn}>
        {"----->>>"}
      </button>
    </div>
  ) : (
    ""
  );
}

export default Auth;
