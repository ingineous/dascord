import { css } from "../styled-system/css";
import Home from "./Components/Home/Home.tsx";
import { Route, Switch } from "wouter";
import Auth from "./Components/Auth/Auth.tsx";
import { useEffect } from "react";
import supabase from "./supabase.ts";
import { useAuth } from "./state/auth.ts";
import routes from "./config/routes.ts";
import ChatPage from "./Components/ChatPage/ChatPage.tsx";
import Explore from "./Components/Explore.tsx";
import Friends from "./Components/Friends/Friends.tsx";
import Settings from "./Components/Settings/Settings.tsx";
import { io } from "socket.io-client";
import api, { API_URL } from "./config/axios.ts";
import { useSocket } from "./state/socket.ts";
import { Message, useChat } from "./state/chat.ts";

function App() {
  const styles = css({
    height: "100vh",
    display: "flex",
    width: "100%",
    color: "antiFlashWhiteJet",
    fontFamily: "IBM Plex Mono, monospace",
  });

  const { session, loading, setSession, setLoading, setError, setUser, user } =
    useAuth();
  const { socket, setSocket } = useSocket();
  const { chats, setChats } = useChat();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(() => {
    const newSocket = io(API_URL, {
      auth: {
        accessToken: session?.access_token,
      },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket, session]);

  useEffect(() => {
    function onConnect() {
      console.log("connected", socket?.connected, socket?.id);
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    if (!socket) return;

    const onMsg = async (data: { userID: string; message: Message }) => {
      console.log("whore outside", data, chats);

      const chatMap = chats.map((chat) => {
        if (chat.authID === data.userID) {
          return {
            ...chat,
            messages: [data.message, ...chat.messages],
          };
        }

        return chat;
      });

      setChats(chatMap);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newmsg", onMsg);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newmsg", onMsg);
    };
  }, [socket, chats]);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);

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
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        try {
          const { data: authUser } = await api.post("/register", {
            accessToken: session.access_token,
          });

          setUser(authUser);
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log("sesssisosnsnsn change", session, loading, user);
  }, [session]);

  return (
    <div className={styles}>
      <Switch>
        <Route path={routes.home} component={Home} />
        <Route path={routes.auth} component={Auth} />
        <Route path={routes.chat} component={ChatPage} />
        <Route path={routes.explore} component={Explore} />
        <Route path={routes.friends} component={Friends} />
        <Route path={routes.settings} component={Settings} />
      </Switch>
    </div>
  );
}

export default App;
