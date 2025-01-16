import Modal from "../Modal";
import "./HeaderBar.css";

const HeaderBar = ({
  onAuthClick,
  currentModal,
  onModalClose,
  onThemeToggle,
}) => {
  return (
    <header>
      <nav>
        <h1>tax front</h1>
        <button onClick={onAuthClick}>signup / login</button>
        <Modal isOpen={currentModal == "auth"} onClose={onModalClose}>
          <h2>hello from modal!</h2>
          <p>this is a simple modal</p>
          <button onClick={onThemeToggle}>change theme</button>
        </Modal>
      </nav>
    </header>
  );
};

export default HeaderBar;
