import { css } from "../../styled-system/css/css";
import Protected from "./Protected/Protected.tsx";
import { useEffect, useState } from "react";
import api from "../config/axios.ts";
import { useAuth } from "../state/auth.ts";
import {
  exportPrivateCryptoKey,
  exportPublicCryptoKey,
  initializeKeys,
} from "../utils/encryption.ts";
import UploadKey from "./Auth/UploadKey.tsx";
import { useKey } from "../state/key.ts";
import { useRouter } from "wouter";

function AuthCallback() {
  const container = css({
    background: "eerieBlack",
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    padding: "50px",
    alignItems: "center",
  });

  const { session } = useAuth();
  const { user, setUser } = useAuth();
  const { setPrivateKey } = useKey();

  const [privateKey, _setPrivateKey] = useState("");
  const [run, setRun] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const register = async () => {
      if (!user && session && run === 0) {
        setRun(1);

        try {
          const key = await initializeKeys();
          const publicKey = await exportPublicCryptoKey(key);

          console.log("registering");

          const { data: authUser } = await api.post("/register", {
            accessToken: session?.access_token,
            publicKey: publicKey,
          });
          setUser(authUser);

          window.open("/chat");

          const privateKey = await exportPrivateCryptoKey(key);
          // download(privateKey);

          _setPrivateKey(privateKey);
          setPrivateKey(privateKey);
        } catch (error) {
          console.error(error);
        }
      }
    };

    register();
  }, [session]);

  const buttonStyles = css({
    cursor: "pointer",
    fontSize: "54px",
    _hover: {
      textDecoration: "underline",
    },
    marginBottom: "50px",
  });

  const download = (privateKey) => {
    const keyBlob = new Blob([JSON.stringify(privateKey)], {
      type: "application/json",
    });

    const blobURL = URL.createObjectURL(keyBlob);

    const link = document.createElement("a");

    link.href = blobURL;
    link.download = "privateKey.pem";

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );

    document.body.removeChild(link);
  };

  return (
    <Protected disabledPrivate={true}>
      <div className={container}>
        {/*{privateKey && (*/}
        {/*  <>*/}
        {/*    <button*/}
        {/*      className={buttonStyles}*/}
        {/*      onClick={() => download(privateKey)}*/}
        {/*    >*/}
        {/*      Download Private Key*/}
        {/*    </button>*/}

        {/*    <p>*/}
        {/*      Keep the key safe else you wouldn't be able to access your chats*/}
        {/*    </p>*/}
        {/*  </>*/}
        {/*)}*/}

        {/*{!privateKey && <UploadKey />}*/}
      </div>
    </Protected>
  );
}

export default AuthCallback;
