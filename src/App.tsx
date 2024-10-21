import { css } from "../styled-system/css";
import Home from "./Components/Home/Home.tsx";
import { Route, Switch } from "wouter";
import Auth from "./Components/Auth/Auth.tsx";
import { useEffect } from "react";
import supabase from "./supabase.ts";
import { useAuth } from "./state/auth.ts";

// background: `url("/background.png")`,
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     backgroundColor: "rgba(0, 0, 0, 0.85)",
//     backgroundBlendMode: "overlay",

function App() {
  const styles = css({
    height: "100vh",
    display: "flex",
    width: "100%",
    color: "antiFlashWhiteJet",
    fontFamily: "IBM Plex Mono, monospace",
  });

  const { setSession } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
