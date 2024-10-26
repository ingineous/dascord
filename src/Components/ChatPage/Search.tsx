import { css } from "../../../styled-system/css";
import { useEffect } from "react";

function Search() {
  const inputStyles = css({
    background: "darkEerie",
    fontSize: "12px",
    padding: "5px 15px",
    borderRadius: "7px 7px 0 0",
    border: "none",
    outline: "1px solid transparent",
  });

  const containerStyles = css({
    position: "relative",
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

  const searchResultsContainer = css({
    position: "absolute",
    background: "darkEerie",
    width: "100%",
    borderRadius: "0 0 7px 7px",
    padding: "10px",
  });

  const searchResult = css({
    color: "cadetGray",
    fontSize: "14px",
    cursor: "pointer",
    padding: "5px",
    marginBottom: "10px",
    transition: "all 0.1s linear",
  });

  const selectedSearchResult = css({
    fontSize: "12px",
    background: "onyx",
    borderRadius: "7px",
  });

  return (
    <div className={containerStyles}>
      <input
        className={inputStyles}
        type="text"
        id={"search"}
        placeholder="search (ctrl + k)"
      />
      <div className={searchResultsContainer}>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
        <p className={`${searchResult} ${selectedSearchResult}`}>idk</p>
      </div>
    </div>
  );
}

export default Search;
