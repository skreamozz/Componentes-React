import "./Modal.css";

/**
 *
 * @param {*} status parametro encargado de mostrar u ocultar el modal
 * @param {*} handleClose controlador del cierre del modal
 */
const Modal = ({ status = false, children, handleClose }) => {
  return (
    <div className={`overlay ${status ? "open" : ""}`}>
      <div className="modalCustom">
        <span className="closeBtn" onClick={handleClose}>
          x
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
