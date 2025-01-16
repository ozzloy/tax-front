import { useState, useEffect } from "react";

import "./App.css";
import HeaderBar from "./components/HeaderBar";

const App = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [theme, setTheme] = useState("dark");
  const handleAuthOptionsClick = () => {
    setCurrentModal("auth");
  };

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

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

  return (
    <>
      <HeaderBar
        onAuthClick={handleAuthOptionsClick}
        currentModal={currentModal}
        onModalClose={() => setCurrentModal(null)}
        onThemeToggle={toggleTheme}
      />
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
