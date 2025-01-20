import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchThemes } from "../../store/uiSlice";
import ThemeDetail from "../ThemeDetail";
import ThemeForm from "../ThemeForm";
import "./Theme.css";

const Theme = () => {
  const { theme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const themes = Object.entries(theme);

  useEffect(() => {
    dispatch(fetchThemes());
  }, [dispatch]);

  return (
    <section className="themes-section">
      <ThemeForm />
      {themes &&
        themes.map(([themeId, themeData]) => (
          <ThemeDetail
            key={themeId}
            themeId={Number(themeId)}
            themeData={themeData}
          />
        ))}
    </section>
  );
};

export default Theme;
