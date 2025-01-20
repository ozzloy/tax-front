import { useDispatch } from "react-redux";
import "./Signup.css";
import { setCurrentModal } from "../../store/uiSlice";
import { useState } from "react";
import { signup } from "../../store/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    nick: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "email required";
    if (!formData.nick) errors.nick = "nick required";
    if (formData.password.length < 6)
      errors.password = "password must be at least 6 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await dispatch(signup(formData));
    if (signup.rejected.match(result)) {
      if (result.payload?.errors) {
        setErrors(result.payload.errors);
      } else {
        setErrors(result.payload || { _error: "signup failed" });
      }
      return;
    }
    dispatch(setCurrentModal("auth"));
  };

  return (
    <form onSubmit={handleSignup} className="signup">
      <h2>signup</h2>

      <label>email</label>
      <input
        name="email"
        type="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>nick</label>
      <input
        name="nick"
        type="text"
        placeholder="nick"
        value={formData.nick}
        onChange={handleChange}
      />
      {errors.nick && <p className="error">{errors.nick}</p>}

      <label>password</label>
      <input
        name="password"
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      {errors._error && <p className="error">{errors._error}</p>}
      <button type="submit">sign up</button>

      <p>after signup, you will be directed to log in</p>
    </form>
  );
};
export default Signup;
