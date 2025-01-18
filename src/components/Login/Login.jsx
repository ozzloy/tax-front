import { useState } from "react";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="login-form">
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

      <button>sign in</button>
    </section>
  );
};
export default Login;
