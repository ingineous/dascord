import Protected from "./Protected/Protected.tsx";
import { css } from "../../styled-system/css";
import { Link } from "wouter";
import routes from "../config/routes.ts";
import { useEffect, useState } from "react";
import { useAuth, User } from "../state/auth.ts";
import api from "../config/axios.ts";

function Explore() {
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

  const mainStyles = css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 40%)",
    justifyContent: "space-around",
    rowGap: "40px",
    columnGap: "40px",
    height: "70vh",
    overflowY: "auto",
    width: "90%",
  });

  const itemStyles = css({
    width: "100%",
    display: "flex",
  });

  const titleStyles = css({
    fontSize: "56px",
    height: "15vh",
    marginTop: "80px",
  });

  const imgStyle = css({
    width: "150px",
    height: "150px",
    marginRight: "20px",
  });

  const nameStyle = css({
    fontWeight: "900",
    textDecoration: "underline",
    fontSize: "20px",
    marginBottom: "10px",
  });

  const descriptionStyles = css({
    fontSize: "12px",
    color: "cadetGray",
  });

  const buttonStyles = css({
    marginTop: "10px",
    color: "cadetGray",
    cursor: "pointer",
    transition: "all 0.01s linear",
    textDecoration: "underline",

    _hover: {
      color: "antiFlashWhite",
    },
  });

  const { session, user, setUser } = useAuth();

  const [niggas, setNiggas] = useState<Array<User>>([]);

  useEffect(() => {
    if (!user || !session) return;

    const getNiggas = async () => {
      try {
        const { data } = await api.post("/get-niggas", {
          accessToken: session?.access_token,
        });

        setNiggas(data);
      } catch (error) {
        console.error(error);
      }
    };

    getNiggas();
  }, [session, user]);

  const friendTheNigga = async (receiverID: string) => {
    try {
      const { data } = await api.post("/friend-request", {
        accessToken: session?.access_token,
        receiverID,
      });

      console.log("dandadan", data);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("street niggas", niggas);
  }, [niggas]);

  return (
    <Protected>
      <div className={containerStyles}>
        <Link href={routes.chat} className={returnStyles}>
          return to chat.
        </Link>

        <h1 className={titleStyles}>find yo niggas.</h1>

        <div className={mainStyles}>
          {niggas.map((nigga) => {
            const ifReqSent = user?.requestsSent.includes(nigga.authID);

            return (
              <div className={itemStyles} key={nigga.authID}>
                <img className={imgStyle} src={nigga.avatar} alt="pic" />

                <div>
                  <p className={nameStyle}>{nigga.name}</p>
                  <p className={descriptionStyles}>{nigga.bio}</p>

                  <button
                    className={buttonStyles}
                    style={{
                      color: ifReqSent ? "#785964" : "inherit",
                      cursor: ifReqSent ? "initial" : "pointer",
                    }}
                    onClick={() => friendTheNigga(nigga.authID)}
                    disabled={ifReqSent}
                  >
                    {ifReqSent ? "req sent" : "friend me -->"}
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

export default Explore;
