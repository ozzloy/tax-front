import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal } from "../../store/uiSlice";
import Modal from "../Modal";
import "./Header.css";
import Login from "../Login";

const Header = () => {
  const dispatch = useDispatch();
  const { currentModal } = useSelector((state) => state.ui);

  const handleAuthOptionsClick = () => {
    dispatch(setCurrentModal("auth"));
  };

  return (
    <header className="header">
      <nav>
        <h1>tax front</h1>
        <button onClick={handleAuthOptionsClick}>
          login / signup
        </button>
        <Modal
          isOpen={currentModal == "auth"}
          onClose={() => dispatch(setCurrentModal(null))}
        >
          <Login />
          <h3>new?</h3>
          <button>sign up</button>
        </Modal>
      </nav>
    </header>
  );
};

export default Header;
