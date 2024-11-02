import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../state/auth.ts";
import { useLocation } from "wouter";
import routes from "../../config/routes.ts";
import { useKey } from "../../state/key.ts";
import UploadKey from "../Auth/UploadKey.tsx";

function Protected({ children, disabledPrivate }: PropsWithChildren) {
  const { session, loading } = useAuth();
  const { privateKey } = useKey();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !session) setLocation(routes.auth);
  }, [session, loading]);

  return session ? (
    <>{disabledPrivate ? children : privateKey ? children : ""}</>
  ) : (
    ""
  );
}

export default Protected;
