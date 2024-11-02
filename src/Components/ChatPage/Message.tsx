import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { css } from "../../../styled-system/css";
import Link from "@tiptap/extension-link";
import MessageFilePreview from "./MessageFilePreview.tsx";
import { formatDistance } from "date-fns";

function Message({
  message,
  avatar,
  name,
  files,
  time,
}: {
  message: string;
  avatar: string;
  name: string;
  files: string[];
  time: Date;
}) {
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
    content: message,
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
    width: "40px",
    marginRight: "30px",
  });

  const editorStyles = css({
    width: "100%",
  });

  const nameStyles = css({
    fontWeight: "900",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  });

  const nameContainer = css({
    position: "relative",
    top: "-7px",
    width: "100%",
  });

  const filesContainer = css({
    display: "grid",
    gridTemplateColumns: "300px 300px",
    columnGap: "10px",
  });

  const timeStyles = css({
    color: "cadetGray",
    fontWeight: "400",
  });

  const currentTime = formatDistance(new Date(), time);

  return (
    <div className={containerStyles}>
      <img className={profileStyles} src={avatar} alt="profile" />
      <div className={nameContainer}>
        <p className={nameStyles}>
          <span>{name}:</span>
          <span className={timeStyles}>{currentTime} ago</span>
        </p>
        <EditorContent className={editorStyles + " message"} editor={editor} />
        <div className={filesContainer}>
          {files &&
            files.map((file, index) => (
              <MessageFilePreview key={index} file={file} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Message;
