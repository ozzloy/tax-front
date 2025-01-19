import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal } from "../../store/uiSlice";
import Modal from "../Modal";
import "./Header.css";
import Login from "../Login";
import { logout } from "../../store/authSlice";
import Signup from "../Signup";

const Header = () => {
  const dispatch = useDispatch();
  const { currentModal } = useSelector((state) => state.ui);
  const { king } = useSelector((state) => state.auth);

  const handleAuthOptions = () => {
    if (king) {
      dispatch(logout());
    } else {
      dispatch(setCurrentModal("auth"));
    }
  };

  const handleSignup = () => {
    dispatch(setCurrentModal("signup"));
  };

  return (
    <header className="header">
      <h1>tax front</h1>
      <button onClick={handleAuthOptions}>
        {king ? "logout" : "login / signup"}
      </button>
      <Modal
        isOpen={currentModal === "auth"}
        onClose={() => dispatch(setCurrentModal(null))}
      >
        <Login />
        <h3>new?</h3>
        <button onClick={handleSignup}>sign up</button>
      </Modal>
      <Modal
        isOpen={currentModal === "signup"}
        onClose={() => dispatch(setCurrentModal(null))}
      >
        <Signup />
      </Modal>
    </header>
  );
};

export default Header;
