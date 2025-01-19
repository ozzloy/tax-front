import { useState } from "react";
import { useDispatch } from "react-redux";

import "./Login.css";
import { login } from "../../store/authSlice";
import { setCurrentModal } from "../../store/uiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    dispatch(setCurrentModal(null));
  };

  return (
    <form onSubmit={handleLogin} className="login">
      <h2>enter email and password</h2>

      <label htmlFor="email">email</label>
      <input
        name="email"
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">password</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />

      <button type="submit">sign in</button>
    </form>
  );
};
export default Login;
