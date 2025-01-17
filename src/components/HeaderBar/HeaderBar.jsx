import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal, toggleTheme } from "../../features/uiSlice";
import Modal from "../Modal";
import "./HeaderBar.css";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const { currentModal } = useSelector((state) => state.ui);
  const handleToggleTheme = () => dispatch(toggleTheme());

  const handleAuthOptionsClick = () => {
    dispatch(setCurrentModal("auth"));
  };

  return (
    <header>
      <nav>
        <h1>tax front</h1>
        <button onClick={handleAuthOptionsClick}>
          signup / login
        </button>
        <Modal
          isOpen={currentModal == "auth"}
          onClose={() => dispatch(setCurrentModal(null))}
        >
          <h2>hello from modal!</h2>
          <p>this is a simple modal</p>
          <button onClick={handleToggleTheme}>change theme</button>
        </Modal>
      </nav>
    </header>
  );
};

export default HeaderBar;
