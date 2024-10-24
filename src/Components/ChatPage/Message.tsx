import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { css } from "../../../styled-system/css";
import Link from "@tiptap/extension-link";

function Message({ message }: { message?: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
      }),
    ],
    content: message ? message : `<p><strong>idk</strong> man</p><p></p>`,
    editable: false,
  });

  const containerStyles = css({
    display: "flex",
    width: "100%",
    fontSize: "16px",
    alignItems: "flex-start",
    padding: "10px 40px",

    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const profileStyles = css({
    width: "30px",
    marginRight: "30px",
  });

  const editorStyles = css({
    width: "100%",
  });

  const nameStyles = css({
    fontWeight: "900",
    marginBottom: "10px",
  });

  const nameContainer = css({
    position: "relative",
    top: "-7px",
  });

  return (
    <div className={containerStyles}>
      <img className={profileStyles} src="/ayase.webp" alt="profile" />
      <div className={nameContainer}>
        <p className={nameStyles}>momo:</p>
        <EditorContent className={editorStyles + " message"} editor={editor} />
      </div>
    </div>
  );
}

export default Message;
