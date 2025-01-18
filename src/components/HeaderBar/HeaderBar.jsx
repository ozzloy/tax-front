import { useSelector, useDispatch } from "react-redux";

import { setCurrentModal } from "../../features/uiSlice";
import Modal from "../Modal";
import "./HeaderBar.css";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const { currentModal } = useSelector((state) => state.ui);

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
        </Modal>
      </nav>
    </header>
  );
};

export default HeaderBar;
