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
export default Modal;
