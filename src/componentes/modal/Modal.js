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
        <div className="overflow-auto contenedor m-2 my-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
