import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThemes } from "./features/uiSlice";

import "./App.css";
import HeaderBar from "./components/HeaderBar";
import ThemeSection from "./components/ThemeSection";

const App = () => {
  const dispatch = useDispatch();
  const { activeThemeId, theme } = useSelector((state) => state.ui);

  const themes = Object.entries(theme);

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

  const handleFetchThemes = () => dispatch(fetchThemes());
  return (
    <>
      <HeaderBar />
      <button onClick={handleFetchThemes}>fetch themes!</button>
      {themes &&
        themes.map(([themeId, themeData]) => (
          <ThemeSection
            key={themeId}
            themeId={Number(themeId)}
            themeData={themeData}
          />
        ))}
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
