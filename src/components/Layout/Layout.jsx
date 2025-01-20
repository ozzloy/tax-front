import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Main from "../Main/Main";
import Nav from "../Nav";
import { useEffect } from "react";
import { fetchThemes } from "../../store/themeSlice";
import { fetchCsrfToken } from "../../store/authSlice";
const Layout = () => {
  const dispatch = useDispatch();
  const { activeThemeId } = useSelector((state) => state.ui);
  const { theme } = useSelector((state) => state.theme);

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
      <Nav />
      <Main />
    </>
  );
};

export default Layout;
