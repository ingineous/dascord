import { PropsWithChildren } from "react";

function Protected({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export default Protected;
