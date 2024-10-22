import { css } from "../../../styled-system/css";

function Profile({
  avatar,
  username,
  bio,
}: {
  avatar: string;
  username: string;
  bio: string;
}) {
  const avatarStyles = css({
    width: "40px",
    height: "40px",
    borderRadius: "0px",
    marginRight: "20px",
  });

  const styles = css({
    display: "flex",
    padding: "5px",
    height: "65px",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const descriptionStyles = css({
    fontSize: "14px",
    width: "100%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  });

  const containerStyles = css({
    cursor: "pointer",
    transition: "background 0.1s linear",

    _hover: {
      background: "rgba(255, 255, 255, 0.1)",
    },
  });

  const usernameStyles = css({
    marginBottom: "5px",
    color: "white",
    fontWeight: "bold",
  });

  const barStyles = css({
    border: "2px solid rgba(255, 255, 255, 0.15)",
    margin: "10px 0 0 0",
  });

  return (
    <div className={containerStyles}>
      <div className={styles}>
        <img className={avatarStyles} src={avatar} alt={"Profile Picture"} />

        <div className={descriptionStyles}>
          <p className={usernameStyles}>{username}</p>
          <p>{bio}</p>
        </div>
      </div>

      <hr className={barStyles} />
    </div>
  );
}

export default Profile;
