import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../Header";
import Main from "../Main";
import Nav from "../Nav";
import { fetchThemes } from "../../store/themeSlice";
import { fetchCsrfToken } from "../../store/authSlice";
import ThemeSelector from "../ThemeSelector";
import { selectCurrentKing } from "../../store/kingSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeThemeId } = useSelector((state) => state.ui);
  const { theme } = useSelector((state) => state.theme);
  const king = useSelector(selectCurrentKing);

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
    const publicPaths = ["/home", "/"];
    if (!king && !publicPaths.includes(location.pathname)) {
      navigate("/home", { replace: true });
    }
  }, [king, location.pathname, navigate]);

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
      <ThemeSelector />
      <Header />
      <Nav />
      <Main />
    </>
  );
};

export default Layout;
