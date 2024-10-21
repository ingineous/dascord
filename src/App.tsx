import { css } from "../styled-system/css";
import Home from "./Components/Home/Home.tsx";
import { Route, Switch } from "wouter";
import Auth from "./Components/Auth/Auth.tsx";
import { useEffect, useState } from "react";
import supabase from "./supabase.ts";
import { Session } from "@supabase/supabase-js";

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

  const [session, setSession] = useState<Session | null>(null);

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

  useEffect(() => {
    console.log("userre sesssion", session);
  }, [session]);

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
