import { css } from "../../../styled-system/css";
import { useEffect, useState } from "react";
import truncate from "../../utils/truncate.ts";
import { IoDownloadOutline } from "react-icons/io5";

function FilePreview({ file }: { file: string }) {
  const [isImage, setIsImage] = useState(false);

  const containerStyles = css({
    display: "flex",
    padding: "5px",
    borderRadius: "10px",
    alignItems: "center",
    minHeight: "55px",
    margin: "10px 5px",
    marginLeft: "0",
    backgroundSize: "cover !important",
    cursor: "pointer",
  });

  const closeContainer = css({
    display: "flex",
    justifyContent: "flex-end",
  });

  useEffect(() => {
    setIsImage(!!file.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i));
  }, [file]);

  const fileNameStyles = css({
    maxWidth: "300px",
    textWrap: "wrap",
    padding: "5px",
    fontSize: "14px",
    color: "silver",
    display: "flex",
    justifyContent: "space-between",

    transition: "color 0.05s linear",

    _hover: {
      color: "antiFlashWhite",
    },
  });

  const iconStyles = css({
    fontSize: "32px",
  });

  return (
    <div
      className={containerStyles}
      onClick={() => window.open(file, "_blank")?.focus()}
      style={{
        background: isImage
          ? `url("${file}") no-repeat center center`
          : "#393b3b",
        height: isImage ? "300px" : "",
        width: isImage ? "300px" : "",
      }}
    >
      {!isImage && (
        <div>
          <p className={fileNameStyles}>
            {truncate(file.split("/").slice(-1)[0], 40)}
            <IoDownloadOutline className={iconStyles} />
          </p>
        </div>
      )}
      <div className={closeContainer}></div>
    </div>
  );
}

export default FilePreview;
