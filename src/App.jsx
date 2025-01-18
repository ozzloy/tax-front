import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTheme, updateThemeField } from "./features/uiSlice";

import "./App.css";
import HeaderBar from "./components/HeaderBar";

const App = () => {
  const dispatch = useDispatch();
  const { activeTheme, theme } = useSelector((state) => state.ui);

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
    if (!(activeTheme && theme)) return;
    applyTheme(theme[activeTheme]);
  }, [activeTheme, theme]);

  const handleFetchThemes = async () => {
    const response = await fetch("/api/theme");
    const json = await response.json();
    if (!json) throw json;
    const themeField = json;
    dispatch(updateThemeField(themeField));
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

  const handleThemeChange = (themeId) => {
    dispatch(setActiveTheme(Number(themeId)));
  };

  return (
    <>
      <HeaderBar />
      <button onClick={handleFetchThemes}>fetch themes!</button>
      {themes &&
        themes.map(([themeId, themeData]) => (
          <button
            key={themeId}
            onClick={() => handleThemeChange(themeId)}
          >
            {themeData.name}
          </button>
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
