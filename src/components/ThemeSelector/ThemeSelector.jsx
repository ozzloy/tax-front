import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentKing } from "../../store/kingSlice";

const ThemeSelector = () => {
  const { theme: themeSlice } = useSelector((state) => state.theme);
  const king = useSelector(selectCurrentKing);

  const getSystemThemeName = useCallback(() => {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    return prefersLight ? "light" : "night";
  }, []);

  const getThemeId = useCallback(() => {
    if (king?.theme_id) {
      return king.theme_id;
    }

    const systemThemeName = getSystemThemeName();
    const systemTheme = Object.values(themeSlice).find(
      (theme) =>
        theme.king_id === null && theme.name === systemThemeName,
    );
    const result = systemTheme ? systemTheme.id : themeSlice[1].id;
    return result;
  }, [getSystemThemeName, king, themeSlice]);

  const applyTheme = (theme) => {
    if (!theme) return;
    const cssVars = {
      "--foreground-color": theme.foreground_color,
      "--background-color": theme.background_color,
    };

    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    if (!king) return;
    const { theme_id } = king;
    if (!theme_id) return;
    const theme = themeSlice[theme_id];
    if (!theme) return;
    applyTheme(theme);
  }, [king, themeSlice]);

  useEffect(() => {
    if (!themeSlice) return undefined;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: light)",
    );

    const handleSystemThemeChange = () => {
      if (king || !themeSlice) return;
      const systemPreferredThemeId = getThemeId();
      if (!systemPreferredThemeId) return;
      const theme = themeSlice[systemPreferredThemeId];
      if (!theme) return;
      applyTheme(theme);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    handleSystemThemeChange();

    return () =>
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange,
      );
  }, [themeSlice, getThemeId, king]);

  // use component just for logic
  return null;
};
export default ThemeSelector;
