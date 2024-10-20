import { css } from "../../../styled-system/css";
import Button from "../Button.tsx";
import { Link } from "wouter";

function Home() {
  const styles = css({
    background: "eerieBlack",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "30px",
  });

  const navbarStyles = css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "200px",
  });

  const dascord = css({
    fontWeight: "800",
    fontSize: "36px",
    fontFamily: "IBM Plex Mono, monospace",
  });

  const waifu = css({
    width: "400px",
  });

  const container = css({
    display: "flex",
    justifyContent: "space-between",
  });

  const heading = css({
    fontSize: "48px",
    fontWeight: 800,
    marginBottom: "30px",
  });

  const text = css({
    fontSize: "24px",
    marginBottom: "30px",
    lineHeight: 2,
  });

  const textContainer = css({
    display: "flex",
    flexDirection: "column",
  });

  const underline = css({
    textDecoration: "underline",
  });

  const Navbar = () => (
    <div className={navbarStyles}>
      <p className={dascord}>Dascord.</p>
      <Button text={"log in."} />
    </div>
  );

  return (
    <div className={styles}>
      <Navbar />

      <div className={container}>
        <div className={textContainer}>
          <p className={heading}>this is momo.</p>
          <p className={text}>
            she doesn't exist go take yo pills,
            <br /> but do you know who does exist the mfs on{" "}
            <span className={underline}>dascord.</span>
          </p>

          <Link href={"/auth"}>
            <Button />
          </Link>
        </div>
        <img className={waifu} src="/ayase.webp" alt="waifu" />
      </div>
    </div>
  );
}

export default Home;
