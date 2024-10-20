import { useState, useEffect } from "react";

const useTypewriter = (text: string) => {
  const [displayText, setDisplayText] = useState("");

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const effect = async () => {
    for (const char of [...text]) {
      await sleep(1000);

      setDisplayText((prevState) => prevState + char);
    }
  };

  useEffect(() => {
    effect();
  }, []);

  return displayText;
};

export default useTypewriter;
