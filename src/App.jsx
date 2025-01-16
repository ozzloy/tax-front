import { useState, useEffect } from "react";

import "./App.css";
import Modal from "./components/Modal";

const App = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [theme, setTheme] = useState("dark");
  const handleAuthOptions = () => {
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
      <header>
        <nav>
          <h1>tax front</h1>
          <button onClick={handleAuthOptions}>signup / login</button>
          <Modal
            isOpen={currentModal == "auth"}
            onClose={() => setCurrentModal(null)}
          >
            <h2>hello from modal!</h2>
            <p>this is a simple modal</p>
            <button onClick={toggleTheme}>change theme</button>
          </Modal>
        </nav>
      </header>
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
