import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import HeaderBar from "./components/HeaderBar";

const App = () => {
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    const foreground = theme === "dark" ? "whitesmoke" : "#111";
    const background = theme === "dark" ? "#111" : "whitesmoke";
    document.documentElement.style.setProperty(
      "--foreground-color",
      foreground,
    );

    document.documentElement.style.setProperty(
      "--background-color",
      background,
    );
  }, [theme]);

  const handleFetchThemes = async () => {
    console.log("hi");
    const response = await fetch("/api/csrf-token");
    const json = await response.json();
    console.log("json");
    console.log(json);
  };

  return (
    <>
      <HeaderBar />
      <button onClick={handleFetchThemes}>fetch themes!</button>
      <main>
        <article>
          <p>fill usa tax form 1040 for entertainment purposes.</p>
        </article>
        <footer>
          <small>built with love and kindness</small>
        </footer>
      </main>
    </>
  );
};

export default App;
