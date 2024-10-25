import Protected from "./Components/Protected/Protected.tsx";
import { css } from "../styled-system/css";
import { Link } from "wouter";
import routes from "./config/routes.ts";

function Explore() {
  const containerStyles = css({
    display: "flex",
    background: "eerieBlack",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    padding: "10px 20px",
    alignItems: "center",
  });

  const returnStyles = css({
    alignSelf: "flex-start",

    _hover: {
      textDecoration: "underline",
    },
  });

  const mainStyles = css({
    display: "grid",
    gridTemplateColumns: "repeat(2, 40%)",
    justifyContent: "space-around",
    rowGap: "40px",
    columnGap: "40px",
    height: "70vh",
    overflowY: "auto",
    width: "90%",
  });

  const itemStyles = css({
    width: "100%",
    display: "flex",
  });

  const titleStyles = css({
    fontSize: "56px",
    height: "15vh",
    marginTop: "80px",
  });

  const imgStyle = css({
    width: "150px",
    height: "150px",
    marginRight: "20px",
  });

  const nameStyle = css({
    fontWeight: "900",
    textDecoration: "underline",
    fontSize: "20px",
    marginBottom: "10px",
  });

  const descriptionStyles = css({
    fontSize: "12px",
    color: "cadetGray",
  });

  const buttonStyles = css({
    marginTop: "10px",
    color: "cadetGray",
    cursor: "pointer",
    transition: "all 0.01s linear",
    textDecoration: "underline",

    _hover: {
      color: "antiFlashWhite",
    },
  });

  return (
    <Protected>
      <div className={containerStyles}>
        <Link href={routes.chat} className={returnStyles}>
          return to chat.
        </Link>

        <h1 className={titleStyles}>friend some niggas.</h1>

        <div className={mainStyles}>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
          <div className={itemStyles}>
            <img className={imgStyle} src="/ayase.webp" alt="idk" />

            <div>
              <p className={nameStyle}>momo ayase</p>
              <p className={descriptionStyles}>
                let me give you some advice bastard. dont forget who you are
                cause the rest of the world would never. wear it like an armour
                and it could never be used to hurt you.
              </p>

              <button className={buttonStyles}>friend me{" -->"}</button>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}

export default Explore;
