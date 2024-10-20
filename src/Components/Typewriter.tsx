import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";

export interface TypewriterProps {
  string: string;
  className?: string;
  cursor?: string;
  delay?: number;
}

export function Typewriter({
  string,
  className,
  cursor = "_",
  delay = 300,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [pointer, setPointer] = useState(-1);
  const [reverse, setReverse] = useState(false);

  const cursorStyles = css({
    fontWeight: 800,
    fontSize: "50px",
    color: "cadetGray",
  });

  useEffect(() => {
    if (pointer === string.length && !reverse) {
      setReverse(true);
    } else if (pointer === -1 && reverse) {
      setReverse(false);
    }

    if (!reverse) {
      if (pointer < string.length) {
        setTimeout(() => {
          setText(text + string.charAt(pointer));
          setPointer(pointer + 1);
        }, delay);
      }
    } else {
      if (pointer > -1) {
        setTimeout(() => {
          setText(text.slice(0, -1));

          setPointer(pointer - 1);
        }, delay);
      }
    }
  }, [pointer, reverse]);

  return (
    <span className={className}>
      {text}

      <span className={cursorStyles}>{cursor}</span>
    </span>
  );
}
