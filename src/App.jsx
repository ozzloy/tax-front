import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal, toggleTheme } from "./features/uiSlice";
import "./App.css";
import HeaderBar from "./components/HeaderBar";

const App = () => {
  const dispatch = useDispatch();
  const { currentModal, theme } = useSelector((state) => state.ui);

  const handleAuthOptionsClick = () => {
    dispatch(setCurrentModal("auth"));
  };

  const handleToggleTheme = () => dispatch(toggleTheme());

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
        onModalClose={() => dispatch(setCurrentModal(null))}
        onThemeToggle={handleToggleTheme}
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
