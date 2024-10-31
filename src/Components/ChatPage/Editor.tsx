import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import { css } from "../../../styled-system/css";
import { IoMdAttach } from "react-icons/io";
import { useEffect, useState } from "react";
import Files from "./Files.tsx";
import Link from "@tiptap/extension-link";
import api from "../../config/axios.ts";
import readFileAsDataURL from "../../utils/readAsDataUrl.ts";
import { useAuth } from "../../state/auth.ts";

const content = ``;

interface FileInterface {
  name: string;
  url: string;
}

const Editor = () => {
  const { session } = useAuth();

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
      Placeholder.configure({
        placeholder: "enter to send.",
      }),
    ],
    content,
  });

  const [files, setFiles] = useState<Array<File>>([]);

  const containerStyles = css({
    width: "100%",
    fontSize: "16px",
    backgroundColor: "darkEerie",
    padding: "20px",
    borderRadius: "15px",
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

  const onEnter = async (event: {
    key: string;
    preventDefault: () => void;
    ctrlKey: boolean;
  }) => {
    if (event.key === "Enter" && !event.ctrlKey) {
      event.preventDefault();
      const content = editor?.getHTML();

      editor?.commands.clearContent();

      const filesList: Array<FileInterface> = [];

      for (let i = 0; i < files.length; i++) {
        const name = files[i].name;
        const url = await readFileAsDataURL(files[i]);

        filesList.push({ name, url });
      }

      const data = await api.post("/send-msg", {
        accessToken: session?.access_token,
        receiverID: "1f1b7262-c648-4a53-9511-38de1c105d76",
        text: content,
        files: filesList,
      });

      console.log("dad", data);

      // window.open(data.data[0].files[0].url, "_blank")?.focus();

      // console.log("enterrrrrrr", "dad", content, data);
    }
  };

  const upload = () => {
    document.getElementById("uploader")?.click();
  };

  useEffect(() => {
    console.log("filsessesss", files);
  }, [files]);

  const textEditorContainer = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  return (
    <div className={containerStyles}>
      <div className={textEditorContainer}>
        <IoMdAttach className={iconStyles} onClick={upload} />

        <input
          type="file"
          // accept={"image/*"}
          id={"uploader"}
          style={{ display: "none" }}
          multiple={true}
          onChange={(event) => {
            if (event.target.files) {
              setFiles([...files, ...event.target.files]);
            }
          }}
        />

        <EditorContent
          className={editorStyles}
          editor={editor}
          onKeyDown={onEnter}
        />
      </div>
      <Files files={files} setFiles={setFiles} />
    </div>
  );
};

export default Editor;
