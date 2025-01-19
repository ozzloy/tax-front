import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchThemes } from "../../store/uiSlice";
import ThemeSection from "../ThemeSection";

const Themes = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const themes = Object.entries(theme);

  useEffect(() => {
    dispatch(fetchThemes());
  }, []);
  return (
    <section className="themes-section">
      {themes &&
        themes.map(([themeId, themeData]) => (
          <ThemeSection
            key={themeId}
            themeId={Number(themeId)}
            themeData={themeData}
          />
        ))}
    </section>
  );
};

export default Themes;
