import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import colors from "color-name";

import "./ThemeForm.css";
import { addTheme, fetchThemes } from "../../store/themeSlice";

const ThemeForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    name: "",
    background_color: "black",
    foreground_color: "white",
  });
  const [errors, setErrors] = useState({});

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

  const handleAddTheme = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await dispatch(addTheme(formData));
    if (result.error) {
      setErrors(
        result.payload?.errors || { _error: "failed to add theme" },
      );
      return;
    }
    dispatch(fetchThemes);
    //TODO: close theme form
  };

  return (
    <form className="theme-form" onSubmit={handleAddTheme}>
      <h2>theme</h2>

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
        disabled={status === "loading"}
      />
      {errors.background_color && (
        <p className="error">{errors.background_color}</p>
      )}

      {errors._error && <p className="error">{errors._error}</p>}
      <button disabled={status === "loading"}>
        {status === "loading" ? "adding" : "add"} theme
      </button>
    </form>
  );
};

export default ThemeForm;
