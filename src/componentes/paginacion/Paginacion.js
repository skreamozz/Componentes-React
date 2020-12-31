import { useCallback, useEffect, useState } from "react";

//cantidad de paginas simultaneas que muestra la paginacion
const ItemsPaginacion = 5;

/**
 * @param {*} cantidadItems cantidad total de elementos de la tabla
 * @param {*} paginaActual página que se esta mostrando
 * @param {*} elementosAMostrar cantidad de elementos que se van a mostrar en la tabla
 * @param {*} handlePaginacion controlador del cambio de paginas este debe recibir un numero y devolver una funcion. (pag) => (e)=> {}
 */
const Paginacion = ({
  cantidadItems,
  paginaActual,
  elementosAMostrar,
  children,
  handlePaginacion,
}) => {
  const [cantPaginas, setCantPaginas] = useState(0);
  const [Items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);

  handlePaginacion = useCallback(handlePaginacion, [handlePaginacion]);
  //controlador de los elementos de la paginacion que no son paginas.
  const handlePuntitos = (e) => {
    const { target } = e;
    if (target.classList.contains("disabled")) return;
    switch (target.id) {
      case "restar":
        if (offset === 0) return;
        setOffset(offset - 1);
        break;
      case "sumar":
        setOffset(offset + 1);
        break;
      case "primero":
        handlePaginacion(1)();
        setOffset(0);
        break;
      case "ultimo":
        const offsetTemp = cantPaginas / ItemsPaginacion - 1;
        if (paginaActual === cantPaginas) break;
        handlePaginacion(cantPaginas)();
        if (offsetTemp === 0) break;
        setOffset(offsetTemp);
        break;
      default:
        break;
    }
  };
  //efecto encargado de verificar y resetear el ofset cuando la pagina sea = a 1
  useEffect(() => {
    if (paginaActual === 1) {
      setOffset(0);
    }
  }, [paginaActual]);

  //efecto encargado de calcular la cantidad de paginas que va a tener la paginacion
  //
  useEffect(() => {
    let paginas = Math.floor(cantidadItems / elementosAMostrar);
    if (paginas * elementosAMostrar < cantidadItems) paginas++;
    setCantPaginas(paginas);
  }, [cantidadItems, elementosAMostrar]);

  //efecto que se encarga de crear todos los items de la paginacion.
  useEffect(() => {
    let items = [];
    for (let index = 1; index <= ItemsPaginacion; index++) {
      if (index + ItemsPaginacion * offset <= cantPaginas) {
        items.push(
          <li
            key={index}
            className={`page-item ${
              paginaActual === index + ItemsPaginacion * offset && "active"
            }`}
            onClick={handlePaginacion(index + ItemsPaginacion * offset)}
          >
            <span className="page-link user-select-none">
              {index + ItemsPaginacion * offset}
            </span>
          </li>
        );
      }

      setItems(items);
    }
  }, [cantPaginas, paginaActual, handlePaginacion, offset]);
  return (
    <div className="row">
      <div className="col">
        <ul className="pagination pagination-sm">
          <li className="page-item" onClick={handlePuntitos}>
            <span id="primero" className="page-link user-select-none">
              Primero
            </span>
          </li>
          <li
            onClick={handlePuntitos}
            className={`page-item ${offset === 0 ? "disabled" : ""}`}
          >
            <span id="restar" className="page-link user-select-none">
              ...
            </span>
          </li>

          {Items}
          <li
            onClick={handlePuntitos}
            className={`page-item ${
              offset * ItemsPaginacion + ItemsPaginacion >= cantPaginas
                ? "disabled"
                : ""
            }`}
          >
            <span id="sumar" className="page-link user-select-none">
              ...
            </span>
          </li>
          <li className="page-item" onClick={handlePuntitos}>
            <span id="ultimo" className="page-link user-select-none">
              Ultimo
            </span>
          </li>
        </ul>
        {children}
        <ul className="pagination pagination-sm">
          <li className="page-item" onClick={handlePuntitos}>
            <span id="primero" className="page-link user-select-none">
              Primero
            </span>
          </li>
          <li
            onClick={handlePuntitos}
            className={`page-item ${offset === 0 ? "disabled" : ""}`}
          >
            <span id="restar" className="page-link user-select-none">
              ...
            </span>
          </li>
          {Items}
          <li
            onClick={handlePuntitos}
            className={`page-item ${
              offset * ItemsPaginacion + ItemsPaginacion >= cantPaginas
                ? "disabled"
                : ""
            }`}
          >
            <span id="sumar" className="page-link user-select-none">
              ...
            </span>
          </li>
          <li className="page-item" onClick={handlePuntitos}>
            <span id="ultimo" className="page-link user-select-none">
              Ultimo
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Paginacion;
