import { css } from "../../../styled-system/css";
import { useEffect } from "react";

function Search() {
  const inputStyles = css({
    background: "darkEerie",
    fontSize: "12px",
    padding: "5px 15px",
    borderRadius: "7px",
    border: "none",
    outline: "1px solid transparent",
  });

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();

        console.log("idk");

        document.getElementById("search")?.focus();
      }
    });
  }, []);

  return (
    <div>
      <input
        className={inputStyles}
        type="text"
        id={"search"}
        placeholder="search (ctrl + k)"
      />
    </div>
  );
}

export default Search;
