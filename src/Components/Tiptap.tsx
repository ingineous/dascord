import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import { css } from "../../styled-system/css";
import { IoMdAttach } from "react-icons/io";

const content = ``;

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "enter to send.",
      }),
    ],
    content,
  });

  const containerStyles = css({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "16px",
    backgroundColor: "darkEerie",
    padding: "20px",
    borderRadius: "15px",
    alignItems: "center",
  });

  const editorStyles = css({
    width: "100%",
    marginLeft: "10px",
  });

  const iconStyles = css({
    fontSize: "32px",
    cursor: "pointer",
    padding: "5px",
    transition: "background 0.1s linear",
    borderRadius: "5px",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const onEnter = (event: {
    key: string;
    preventDefault: () => void;
    ctrlKey: boolean;
  }) => {
    if (event.key === "Enter" && !event.ctrlKey) {
      event.preventDefault();
      const content = editor?.getHTML();

      editor?.commands.clearContent();

      console.log("enterrrrrrr", content);
    }
  };

  return (
    <div className={containerStyles}>
      <IoMdAttach className={iconStyles} />

      <EditorContent
        className={editorStyles}
        editor={editor}
        onKeyDown={onEnter}
      />
    </div>
  );
};

export default Tiptap;
