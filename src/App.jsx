import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
// import Themes from "./components/Themes";
import { fetchCsrfToken } from "./store/authSlice";
import { fetchThemes } from "./store/uiSlice";

const App = () => {
  const dispatch = useDispatch();
  const { activeThemeId, theme } = useSelector((state) => state.ui);

  const applyTheme = (theme) => {
    const cssVars = {
      "--foreground-color": theme.foreground_color,
      "--background-color": theme.background_color,
    };

    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    if (!(activeThemeId && theme)) return;
    applyTheme(theme[activeThemeId]);
  }, [activeThemeId, theme]);

  useEffect(() => {
    dispatch(fetchCsrfToken());
    dispatch(fetchThemes());
  }, [dispatch]);

  return (
    <>
      <Header />
      <SideBar />
      {/* <Themes /> */}
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
