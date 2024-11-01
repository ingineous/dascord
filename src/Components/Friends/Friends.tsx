import { css } from "../../../styled-system/css";
import routes from "../../config/routes.ts";
import { Link } from "wouter";
import Protected from "../Protected/Protected.tsx";
import { useAuth, User } from "../../state/auth.ts";
import { useEffect, useState } from "react";
import api from "../../config/axios.ts";
import WhySoEmpty from "../WhySoEmpty.tsx";

function Friends() {
  const containerStyles = css({
    display: "flex",
    background: "eerieBlack",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    padding: "10px 20px",
    alignItems: "center",
  });

  const returnStyles = css({
    alignSelf: "flex-start",

    _hover: {
      textDecoration: "underline",
    },
  });

  const titleStyles = css({
    fontSize: "56px",
    height: "15vh",
    marginTop: "80px",
  });

  const profileStyles = css({
    height: "100px",
    width: "100px",
    marginRight: "20px",
  });

  const nameStyle = css({
    fontWeight: "900",
    fontSize: "20px",
    textDecoration: "underline",
    marginBottom: "20px",
  });

  const friendStyle = css({
    display: "flex",
    width: "100%",
    justifyContent: "center",
    height: "200px",
  });

  const friendsContainer = css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: "100%",
    columnGap: "10px",
    rowGap: "10px",
    height: "70vh",
    overflowY: "auto",
    justifyContent: "space-around",
  });

  const buttonStyles = css({
    fontSize: "18px",
    cursor: "pointer",
    color: "roseTaupe",
    textDecoration: "underline",

    transition: "color 0.05s linear",

    _hover: {
      color: "rosePompadour",
    },
  });

  const { user, session, setUser } = useAuth();

  const [niggas, setNiggas] = useState<Array<User>>([]);

  useEffect(() => {
    const getNiggas = async () => {
      const { data } = await api.post("/get-request-niggas", {
        accessToken: session?.access_token,
      });

      setNiggas(data.niggas);
    };

    getNiggas();
  }, [user?.requestsReceived]);

  const acceptRequest = async (initiatorID: string) => {
    try {
      const { data } = await api.post("/accept-request", {
        accessToken: session?.access_token,
        initiatorID,
      });

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Protected>
      <div className={containerStyles}>
        <Link href={routes.chat} className={returnStyles}>
          return to chat.
        </Link>
        <h1 className={titleStyles}>niggas who want you.</h1>

        {!niggas.length && <WhySoEmpty text={"why so lonely?"} />}
        <div className={friendsContainer}>
          {niggas.map((nigga) => {
            return (
              <div className={friendStyle} key={nigga.authID}>
                <img
                  className={profileStyles}
                  src={nigga.avatar}
                  alt="profile"
                />
                <div>
                  <p className={nameStyle}>{nigga.name}</p>

                  <button
                    className={buttonStyles}
                    onClick={() => acceptRequest(nigga.authID)}
                  >
                    accept {"-->"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Protected>
  );
}

export default Friends;
