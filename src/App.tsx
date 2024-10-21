import { css } from "../styled-system/css";
import Home from "./Components/Home/Home.tsx";
import { Route, Switch } from "wouter";
import Auth from "./Components/Auth/Auth.tsx";
import { useEffect } from "react";
import supabase from "./supabase.ts";
import { useAuth } from "./state/auth.ts";
import routes from "./config/routes.ts";
import ChatPage from "./Components/ChatPage/ChatPage.tsx";

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

  const { session, loading, setSession, setLoading, setError } = useAuth();

  useEffect(() => {
    const getSession = async () => {
      await setLoading(true);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log("sesssisosnsnsn change", session, loading);
  }, [session]);

  return (
    <div className={styles}>
      <Switch>
        <Route path={routes.home} component={Home} />
        <Route path={routes.auth} component={Auth} />
        <Route path={routes.chat} component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;
