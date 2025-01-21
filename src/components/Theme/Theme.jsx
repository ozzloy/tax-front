import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { readTheme } from "../../store/themeSlice";
import ThemeDetail from "../ThemeDetail";
import ThemeForm from "../ThemeForm";
import "./Theme.css";

const Theme = () => {
  const { theme } = useSelector((state) => state.theme);
  const [showThemeForm, setShowThemeForm] = useState(false);
  const dispatch = useDispatch();
  const themes = Object.entries(theme);
  const toggleShowThemeForm = () => {
    setShowThemeForm(!showThemeForm);
  };

  useEffect(() => {
    dispatch(readTheme());
  }, [dispatch]);

  return (
    <>
      <button onClick={toggleShowThemeForm}>
        {showThemeForm ? "close new theme" : "new theme"}
      </button>
      {showThemeForm && (
        <ThemeForm closeForm={() => setShowThemeForm(false)} />
      )}
      <section className="themes-section">
        {themes &&
          themes.map(([themeId, themeData]) => (
            <ThemeDetail
              key={themeId}
              themeId={Number(themeId)}
              themeData={themeData}
            />
          ))}
      </section>
    </>
  );
};

export default Theme;
