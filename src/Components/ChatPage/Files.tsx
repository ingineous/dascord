import { css } from "../../../styled-system/css";
import FilePreview from "./FilePreview.tsx";
import { Dispatch, SetStateAction } from "react";

function Files({
  files,
  setFiles,
}: {
  files: Array<File>;
  setFiles: Dispatch<SetStateAction<File[]>>;
}) {
  const containerStyles = css({
    display: "flex",
  });

  const removeFile = (index: number) => {
    setFiles((files) => [...files.slice(0, index), ...files.slice(index + 1)]);
  };

  return (
    <div
      className={containerStyles}
      style={{ marginTop: files.length ? "10px" : "0px" }}
    >
      {files.map((file, index) => (
        <FilePreview
          key={index}
          index={index}
          file={file}
          removeFile={removeFile}
        />
      ))}
    </div>
  );
}

export default Files;
