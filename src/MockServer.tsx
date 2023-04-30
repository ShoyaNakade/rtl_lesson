import React from "react";
import axios from "axios";

export const MockServer = () => {
  const [clicked, setClicked] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");

  const fetchJson = async () => {
    setClicked(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setError("Fetching Failed!");
        setClicked(false);
      })
      .then(() => {});
  };

  const buttonText = clicked ? "Loaded" : "Start Fetch";
  return (
    <div>
      <button onClick={fetchJson} disabled={clicked}>
        {buttonText}
      </button>
      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};
