import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../state/auth.ts";
import { useLocation } from "wouter";
import routes from "../../config/routes.ts";

function Protected({ children }: PropsWithChildren) {
  const { session, loading } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !session) setLocation(routes.auth);
  }, [session, loading]);

  return session ? children : "";
}

export default Protected;
