import { css } from "../../../styled-system/css";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import truncate from "../../utils/truncate.ts";
import convert from "convert";

function FilePreview({
  file,
  index,
  removeFile,
}: {
  file: File;
  index: number;
  removeFile: (index: number) => void;
}) {
  const [isImage, setIsImage] = useState(false);
  const [imgURL, setImgURL] = useState<string>("");

  const containerStyles = css({
    display: "flex",
    padding: "5px",
    borderRadius: "10px",
    alignItems: "center",
    minHeight: "55px",
    margin: "0 5px",
    backgroundSize: "cover !important",
  });

  const closeStyles = css({
    padding: "5px",
    fontSize: "26px",
    cursor: "pointer",
    background: "jet",
    borderRadius: "100px",
    marginLeft: "10px",
    opacity: "0.5",
    transition: "opacity 0.1s linear",

    _hover: {
      opacity: 0.8,
    },
  });

  const closeContainer = css({
    display: "flex",
    justifyContent: "flex-end",
    height: "100%",
  });

  useEffect(() => {
    if (file.type.split("/")[0] === "image") {
      setIsImage(true);
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        if (event.target?.result) setImgURL(event.target.result.toString());
      };

      fileReader.readAsDataURL(file);
    } else {
      setIsImage(false);
      setImgURL("");
    }
  }, [file]);

  const fileNameStyles = css({
    maxWidth: "150px",
    textWrap: "wrap",
    fontSize: "14px",
    color: "silver",
  });

  const fileSize = convert(file.size, "bytes").to("best");

  return (
    <div
      className={containerStyles}
      key={index}
      style={{
        background: isImage
          ? `url("${imgURL}") no-repeat center center`
          : "#393b3b",
        height: isImage ? "100px" : "",
        width: isImage ? "100px" : "",
      }}
    >
      {!isImage && (
        <div>
          <p className={fileNameStyles}>{truncate(file.name, 20)}</p>
          <p>{truncate(fileSize.quantity.toString(), 4, "") + fileSize.unit}</p>
        </div>
      )}
      <div
        className={closeContainer}
        onClick={() => removeFile(index)}
        style={{ width: isImage ? "100%" : "fit-content" }}
      >
        <AiOutlineClose className={closeStyles} />
      </div>
    </div>
  );
}

export default FilePreview;
