import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./App.css";
import HeaderBar from "./components/HeaderBar";

const App = () => {
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!theme) return;
    const activeTheme = theme[theme.active];
    const foreground = activeTheme["foreground_color"];
    const background = theme["background_color"];
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
    const response = await fetch("/api/theme");
    const json = await response.json();
    console.log("json");
    console.log(json);
    /*
{'theme': {'1': {'background_color': '#111',
                 'created': '2025-01-18T01:33:12.661973',
                 'id': 1,
                 'king_id': None,
                 'name': 'night',
                 'foreground_color': 'chartreuse',
                 'updated': '2025-01-18T01:33:12.661983'},
           '2': {'background_color': 'black',
                 'created': '2025-01-18T01:33:12.663992',
                 'id': 2,
                 'king_id': None,
                 'name': 'light',
                 'foreground_color': '#111111',
                 'updated': '2025-01-18T01:33:12.663995'}}}
      */
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
