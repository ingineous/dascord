import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { css } from "../../../styled-system/css";

function Message({ message }: { message?: string }) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: message ? message : `<p><strong>idk</strong> man</p><p></p>`,
    editable: false,
  });

  const containerStyles = css({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "16px",
    alignItems: "center",
    padding: "10px 40px",

    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const editorStyles = css({
    width: "100%",
  });

  return (
    <div className={containerStyles}>
      <EditorContent className={editorStyles} editor={editor} />
    </div>
  );
}

export default Message;
