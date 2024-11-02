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
import { useChat } from "../../state/chat.ts";
import { useKey } from "../../state/key.ts";
import { ab2str, importPrivateKey, str2ab } from "../../utils/encryption.ts";

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

  const { currentUser } = useChat();
  const { user } = useAuth();
  const { privateKey } = useKey();

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

      function encode(message: string) {
        const enc = new TextEncoder();
        return enc.encode(message);
      }

      const otherPublicKey = await window.crypto.subtle.importKey(
        "jwk",
        currentUser?.publicKey,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"],
      );

      const myPublicKey = await window.crypto.subtle.importKey(
        "jwk",
        user?.publicKey,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"],
      );

      const importedPrivateKey = await importPrivateKey(privateKey || "");

      // const iv = window.crypto.getRandomValues(new Uint8Array(16));

      const encryptedByOther = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        otherPublicKey,
        encode(content || ""),
      );

      const encryptedByMe = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        myPublicKey,
        encode(content || ""),
      );

      const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        importedPrivateKey,
        str2ab(ab2str(encryptedByMe)),
      );

      console.log("decrypted", ab2str(decrypted));

      await api.post("/send-msg", {
        accessToken: session?.access_token,
        receiverID: currentUser?.authID,
        text: content,
        // encryptedWith: user?.authID,
        files: filesList,
      });

      // await api.post("/send-msg", {
      //   accessToken: session?.access_token,
      //   receiverID: currentUser?.authID,
      //   text: ab2str(encryptedByOther),
      //   encryptedWith: currentUser?.authID,
      //   files: filesList,
      // });
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
