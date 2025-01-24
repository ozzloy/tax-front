import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal } from "../../store/uiSlice";
import Modal from "../Modal";
import "./Header.css";
import Login from "../Login";
import { login, logout } from "../../store/authSlice";
import { readKing, selectCurrentKing } from "../../store/kingSlice";
import Signup from "../Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentModal } = useSelector((state) => state.ui);
  const king = useSelector(selectCurrentKing);

  useEffect(() => {
    dispatch(readKing());
  }, [dispatch]);

  const handleAuthOptions = async () => {
    if (king) {
      const result = await dispatch(logout());
      if (logout.fulfilled.match(result)) {
        navigate("/home");
      }
    } else {
      dispatch(setCurrentModal("auth"));
    }
  };

  const handleSignup = () => {
    dispatch(setCurrentModal("signup"));
  };

  const handleCurious = () => {
    dispatch(
      login({ email: "bob@example.com", password: "password" }),
    );
    dispatch(setCurrentModal(null));
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
        <h3>curious?</h3>
        <button onClick={handleCurious}>try demo user</button>
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
