import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setActiveThemeId } from "../../store/uiSlice";
import "./ThemeDetail.css";
import { updateKing } from "../../store/kingSlice";

const ThemeDetail = ({ themeId, themeData }) => {
  const dispatch = useDispatch();
  const handleThemeChange = (themeId) => {
    dispatch(setActiveThemeId(themeId));
    dispatch(updateKing({ theme_id: themeId }));
  };
  return (
    <section
      className="theme-detail"
      style={{
        backgroundColor: themeData.background_color,
        color: themeData.foreground_color,
        borderColor: themeData.foreground_color,
      }}
    >
      <h2>{themeData.name}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
  );
};

ThemeDetail.propTypes = {
  themeId: PropTypes.number.isRequired,
  themeData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    background_color: PropTypes.string.isRequired,
    foreground_color: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThemeDetail;
