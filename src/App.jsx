import { useState } from "react";
import "./App.css";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </header>
        <main className="modal-body">{children}</main>
      </div>
    </div>
  );
};

function App() {
  const [currentModal, setCurrentModal] = useState(null);
  const handleAuthOptions = () => {
    setCurrentModal("auth");
  };
  return (
    <>
      <header>
        <nav>
          <h1>tax front</h1>
          <button onClick={handleAuthOptions}>signup / login</button>
          <Modal
            isOpen={currentModal == "auth"}
            onClose={() => setCurrentModal(null)}
          >
            <h2>hello from modal!</h2>
            <p>this is a simple modal</p>
          </Modal>
        </nav>
      </header>
      <main>
        <article>
          <p>fill usa tax form 1040 for entertainment purposes.</p>
        </article>
        <footer>
          <small>built with love and kindness</small>
        </footer>
      </main>
    </>
  );
}

export default App;
