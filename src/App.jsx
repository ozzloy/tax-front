import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveThemeId, fetchThemes } from "./features/uiSlice";

import "./App.css";
import HeaderBar from "./components/HeaderBar";

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
  const handleThemeChange = (themeId) => {
    dispatch(setActiveThemeId(Number(themeId)));
  };

  return (
    <>
      <HeaderBar />
      <button onClick={handleFetchThemes}>fetch themes!</button>
      {themes &&
        themes.map(([themeId, themeData]) => (
          <section
            className="theme-section"
            key={themeId}
            style={{
              backgroundColor: themeData.background_color,
              color: themeData.foreground_color,
              borderColor: themeData.foreground_color,
            }}
          >
            <h2>{themeData.name}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <dl>
              <dt>created</dt>
              <dd>{new Date(themeData.created).toLocaleString()}</dd>
              <dt>updated</dt>
              <dd>{new Date(themeData.updated).toLocaleString()}</dd>
            </dl>
            <button
              onClick={() => handleThemeChange(themeId)}
              style={{
                backgroundColor: themeData.background_color,
                color: themeData.foreground_color,
                borderColor: themeData.foreground_color,
              }}
            >
              apply {themeData.name} theme
            </button>
          </section>
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
