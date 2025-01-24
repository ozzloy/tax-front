import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import colors from "color-name";

import "./ThemeForm.css";
import {
  createTheme,
  readTheme,
  updateTheme,
} from "../../store/themeSlice";

const ThemeForm = ({
  closeForm,
  themeId,
  initialData,
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    name: "",
    background_color: "black",
    foreground_color: "white",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        name: initialData.name,
        background_color: initialData.background_color,
        foreground_color: initialData.foreground_color,
      });
    }
  }, [isUpdate, initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidColor = (color) => {
    color = color.toLowerCase();
    const colorRegex = /^#(?:[\da-f]{3}){1,2}$/;
    return color in colors || colorRegex.test(color);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "name required";
    if (!isValidColor(formData.background_color))
      errors.background_color = "invalid color";
    if (!isValidColor(formData.foreground_color))
      errors.foreground_color = "invalid color";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let result;
    if (isUpdate) {
      result = await dispatch(
        updateTheme({ id: themeId, ...formData }),
      );
    } else {
      result = await dispatch(createTheme(formData));
    }

    if (result.error) {
      const action = isUpdate ? "update" : "create";
      setErrors(
        result.payload?.errors || {
          _error: `failed to ${action} theme`,
        },
      );
      return;
    }
    dispatch(readTheme());
    closeForm();
  };

  return (
    <form
      className="theme-form"
      onSubmit={handleSubmit}
      style={{
        backgroundColor: formData.background_color,
        color: formData.foreground_color,
        borderColor: formData.foreground_color,
      }}
    >
      <h2>{isUpdate ? "update" : "new"} theme</h2>

      <label>name</label>
      <input
        placeholder="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>foreground color</label>
      <input
        placeholder="foreground color"
        name="foreground_color"
        type="color"
        value={formData.foreground_color}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.foreground_color && (
        <p className="error">{errors.foreground_color}</p>
      )}

      <label>background color</label>
      <input
        placeholder="background color"
        name="background_color"
        type="color"
        onChange={handleChange}
        value={formData.background_color}
        disabled={status === "loading"}
      />
      {errors.background_color && (
        <p className="error">{errors.background_color}</p>
      )}

      {errors._error && <p className="error">{errors._error}</p>}
      <button
        disabled={status === "loading"}
        style={{
          backgroundColor: formData.foreground_color,
          color: formData.background_color,
          borderColor: formData.background_color,
        }}
      >
        {isUpdate ? "update" : "add"} theme
      </button>
    </form>
  );
};

ThemeForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  themeId: PropTypes.number,
  initialData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    background_color: PropTypes.string.isRequired,
    foreground_color: PropTypes.string.isRequired,
  }),
};

export default ThemeForm;
