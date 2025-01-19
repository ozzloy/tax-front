import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal } from "../../store/uiSlice";
import Modal from "../Modal";
import "./Header.css";
import Login from "../Login";
import { logout } from "../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { currentModal } = useSelector((state) => state.ui);
  const { king } = useSelector((state) => state.auth);

  const handleAuthOptionsClick = () => {
    if (king) {
      dispatch(logout());
    } else {
      dispatch(setCurrentModal("auth"));
    }
  };

  return (
    <header className="header">
      <h1>tax front</h1>
      <button onClick={handleAuthOptionsClick}>
        {king ? "logout" : "login / signup"}
      </button>
      <Modal
        isOpen={currentModal == "auth"}
        onClose={() => dispatch(setCurrentModal(null))}
      >
        <Login />
        <h3>new?</h3>
        <button>sign up</button>
      </Modal>
    </header>
  );
};

export default Header;
