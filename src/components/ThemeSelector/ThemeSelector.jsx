import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveThemeId } from "../../store/uiSlice";
import { selectCurrentKing } from "../../store/kingSlice";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const king = useSelector(selectCurrentKing);

  const mediaQuery = () =>
    window.matchMedia("(prefers-color-scheme: light)");
  const isLight = () => mediaQuery().matches;
  const systemThemeName = () => (isLight() ? "light" : "night");
  const systemTheme = (theme) =>
    Object.values(theme).find(
      (theme) =>
        theme.king_id === null && theme.name === systemThemeName(),
    );
  const systemThemeId = (theme) => systemTheme(theme).id;

  useEffect(() => {
    if (!theme) return;

    const selectedThemeId = king?.theme_id ?? systemThemeId(theme);
    dispatch(setActiveThemeId(selectedThemeId));
  }, [dispatch, king, theme]);

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
  }, [dispatch, king, theme]);

  // use component just for logic
  return null;
};
export default ThemeSelector;
