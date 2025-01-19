import { useDispatch } from "react-redux";
import "./Signup.css";
import { setCurrentModal } from "../../store/uiSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(setCurrentModal("auth"));
  };

  return (
    <form onSubmit={handleSignup} className="signup">
      <h2>enter email, nick, and password</h2>

      <label>email</label>
      <input name="email" type="email" placeholder="email" />

      <label>nick</label>
      <input name="text" type="nick" placeholder="nick" />

      <label>password</label>
      <input name="password" type="password" placeholder="password" />

      <button type="submit">sign up</button>
    </form>
  );
};
export default Signup;
