import { css } from "../../../styled-system/css";
import { readFileAsText } from "../../utils/readAsDataUrl.ts";
import { useKey } from "../../state/key.ts";

function UploadKey() {
  const container = css({
    background: "eerieBlack",
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    padding: "50px",
    alignItems: "center",
  });

  const buttonStyles = css({
    cursor: "pointer",
    fontSize: "54px",
    _hover: {
      textDecoration: "underline",
    },
    marginBottom: "50px",
  });

  const upload = () => {
    document.getElementById("keyuploader")?.click();
  };

  const { setPrivateKey } = useKey();

  return (
    <div className={container}>
      <button onClick={upload} className={buttonStyles}>
        Upload private key.
      </button>
      <input
        type="file"
        accept=".pem"
        id={"keyuploader"}
        style={{ display: "none" }}
        onChange={(event) => {
          console.log(event.target.files);

          if (event.target.files) {
            readFileAsText(event.target.files[0])
              .then((key) => {
                setPrivateKey(key.slice(1, key.length - 1));
              })
              .catch((err) => console.error(err));
          }
        }}
      />
    </div>
  );
}

export default UploadKey;
