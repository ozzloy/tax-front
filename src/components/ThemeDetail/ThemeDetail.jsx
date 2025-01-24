import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";

import "./ThemeDetail.css";
import { selectCurrentKing, updateKing } from "../../store/kingSlice";
import ThemeForm from "../ThemeForm";
import { deleteTheme } from "../../store/themeSlice";

const ThemeDetail = ({ themeId, themeData }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const king = useSelector(selectCurrentKing);
  const themeSlice = useSelector((state) => state.theme.theme);

  const handleDeleteTheme = () => {
    const activeThemeId = king?.theme_id;

    // if the current theme is the theme we're deleting,
    if (activeThemeId === themeId) {
      const restThemeIds = Object.keys(themeSlice)
        .map(Number)
        .filter((id) => id !== themeId);
      //   choose another theme at random
      handleApplyTheme(restThemeIds[0]);
    }
    dispatch(deleteTheme({ id: themeId }));
  };

  const handleApplyTheme = async (themeId) => {
    await dispatch(updateKing({ theme_id: themeId }));
  };

  return (
    (showUpdateForm && (
      <ThemeForm
        closeForm={() => setShowUpdateForm(false)}
        isUpdate={true}
        themeId={themeId}
        initialData={themeData}
      />
    )) || (
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
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </p>
        <dl>
          <dt>created</dt>
          <dd>{new Date(themeData.created).toLocaleString()}</dd>
          <dt>updated</dt>
          <dd>{new Date(themeData.updated).toLocaleString()}</dd>
        </dl>
        <div className="theme-detail-buttons">
          {themeData.king_id === king?.id && (
            <>
              <button
                onClick={() => setShowUpdateForm(true)}
                style={{
                  backgroundColor: themeData.background_color,
                  color: themeData.foreground_color,
                  borderColor: themeData.foreground_color,
                }}
              >
                update
              </button>
              <button
                onClick={handleDeleteTheme}
                style={{
                  backgroundColor: themeData.background_color,
                  color: themeData.foreground_color,
                  borderColor: themeData.foreground_color,
                }}
              >
                delete
              </button>
            </>
          )}
          <button
            onClick={() => handleApplyTheme(themeId)}
            style={{
              backgroundColor: themeData.background_color,
              color: themeData.foreground_color,
              borderColor: themeData.foreground_color,
            }}
          >
            apply
          </button>
        </div>
      </section>
    )
  );
};

ThemeDetail.propTypes = {
  themeId: PropTypes.number.isRequired,
  themeData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    king_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null]),
    ]),
    background_color: PropTypes.string.isRequired,
    foreground_color: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThemeDetail;
