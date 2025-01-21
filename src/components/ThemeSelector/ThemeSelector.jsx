import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveThemeId } from "../../store/uiSlice";
import { selectCurrentKing } from "../../store/kingSlice";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const king = useSelector(selectCurrentKing);

  const mediaQuery = useCallback(
    () => window.matchMedia("(prefers-color-scheme: light)"),
    [],
  );
  const systemTheme = useCallback(
    (theme) => {
      const isLight = () => mediaQuery().matches;
      const systemThemeName = () => (isLight() ? "light" : "night");
      return Object.values(theme).find(
        (theme) =>
          theme.king_id === null && theme.name === systemThemeName(),
      );
    },
    [mediaQuery],
  );
  const systemThemeId = useCallback(
    (theme) => systemTheme(theme).id,
    [systemTheme],
  );

  useEffect(() => {
    if (!theme) return;

    const selectedThemeId = king?.theme_id ?? systemThemeId(theme);
    dispatch(setActiveThemeId(selectedThemeId));
  }, [dispatch, king, systemThemeId, theme]);

  // handle system theme changes
  useEffect(() => {
    // ignore system theme changes if logged in
    if (king) return undefined;
    const handleSystemThemeChange = () => {
      // if themes aren't loaded yet, can't set theme, so do nothing
      if (!theme) return;
      dispatch(setActiveThemeId(systemThemeId(theme)));
    };

    mediaQuery().addEventListener("change", handleSystemThemeChange);

    const remover = () =>
      mediaQuery().removeEventListener(
        "change",
        handleSystemThemeChange,
      );
    return remover;
  }, [dispatch, king, mediaQuery, systemThemeId, theme]);

  // use component just for logic
  return null;
};
export default ThemeSelector;
